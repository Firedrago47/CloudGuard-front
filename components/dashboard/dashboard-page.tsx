"use client";

import { useState, useTransition, useCallback, useEffect } from "react";

import { AlertTable } from "@/components/dashboard/alert-table";
import { AlertDistribution } from "@/components/dashboard/alert-distribution";
import { RunAnalysisButton } from "@/components/dashboard/run-analysis-button";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { UserCards } from "@/components/dashboard/user-cards";
import type { Alert, IAMUser, AlertMetrics } from "@/components/dashboard/types";
import { Card, CardContent } from "@/components/ui/card";

function formatScanTime(value: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function computeMetrics(alerts: Alert[], users: IAMUser[]): AlertMetrics {
  const criticalAlerts = alerts.filter((a) => a.severity === "Critical").length;
  const highAlerts = alerts.filter((a) => a.severity === "High").length;
  const bruteForceAlerts = alerts.filter((a) => a.alert_type === "Brute Force Login Attempt").length;
  const missingMfaAlerts = alerts.filter((a) => a.alert_type === "Missing MFA").length;
  const overPermissiveAlerts = alerts.filter((a) => a.alert_type === "Overly Permissive IAM Policy").length;
  const uniqueUsers = new Set(alerts.map((a) => a.username)).size;
  const noMfaUsers = users.filter((u) => !u.mfa_enabled).length;
  const mfaCompliant = users.filter((u) => u.mfa_enabled).length;

  return {
    totalAlerts: alerts.length,
    criticalAlerts,
    highAlerts,
    bruteForceAlerts,
    missingMfaAlerts,
    overPermissiveAlerts,
    uniqueUsers,
    noMfaUsers,
    mfaCompliant,
    totalUsers: users.length,
  };
}

export function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [users, setUsers] = useState<IAMUser[]>([]);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const metrics = computeMetrics(alerts, users);

  // Load persisted alerts and users on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/aws-logs").then((res) => (res.ok ? res.json() : [])),
      fetch("/api/aws-logs/users").then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([historyData, usersData]) => {
        const historyAlerts = Array.isArray(historyData) ? historyData : [];
        const iamUsers = Array.isArray(usersData) ? usersData : [];

        if (historyAlerts.length > 0) {
          setAlerts(historyAlerts);
          setHasScanned(true);
          setLastScanTime(new Date().toISOString());
        }
        if (iamUsers.length > 0) {
          setUsers(iamUsers);
        }
      })
      .catch(() => {
        // Silently handle — user just needs to click "Run Analysis"
      })
      .finally(() => setInitialLoading(false));
  }, []);

  const fetchUsers = useCallback(() => {
    setUsersLoading(true);
    fetch("/api/aws-logs/users")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
      .finally(() => setUsersLoading(false));
  }, []);

  const runAnalysis = () => {
    startTransition(async () => {
      setError(null);

      try {
        const response = await fetch("/api/aws-logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(
            payload?.error ?? `Analysis failed with status ${response.status}`,
          );
        }

        const data = (await response.json()) as Alert[];
        setAlerts(Array.isArray(data) ? data : []);
        setLastScanTime(new Date().toISOString());
        setHasScanned(true);
      } catch (caughtError) {
        // Keep existing alerts visible instead of clearing everything
        setHasScanned(true);
        setLastScanTime(new Date().toISOString());
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to run CloudGuard analysis.",
        );
      }
    });

    fetchUsers();
  };

  if (initialLoading) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-background">
        <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-background">
      <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              CloudGuard Dashboard
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Security posture at a glance
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Launch on-demand analysis to detect brute-force logins, IAM
              misconfigurations, missing MFA, and track your overall security posture.
            </p>
          </div>
          <RunAnalysisButton isLoading={isPending} onClick={runAnalysis} />
        </div>

        {/* Summary cards */}
        <SummaryCards {...metrics} lastScanTime={formatScanTime(lastScanTime)} />

        {/* Error */}
        {error ? (
          <Card className="mt-6 border-red-500/30 bg-red-500/10">
            <CardContent className="p-5">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </CardContent>
          </Card>
        ) : null}

        {/* Charts row */}
        {(hasScanned && alerts.length > 0) || users.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {alerts.length > 0 && <AlertDistribution alerts={alerts} />}
            {users.length > 0 && <UserCards users={users} isLoading={usersLoading} />}
          </div>
        ) : null}

        {/* Alert table */}
        <div className="mt-6 flex-1">
          <AlertTable alerts={alerts} hasScanned={hasScanned} />
        </div>
      </section>
    </main>
  );
}