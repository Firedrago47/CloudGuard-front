"use client";

import { useState, useTransition } from "react";

import { AlertTable } from "@/components/dashboard/alert-table";
import { RunAnalysisButton } from "@/components/dashboard/run-analysis-button";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import type { Alert } from "@/components/dashboard/types";
import { Card, CardContent } from "@/components/ui/card";

function formatScanTime(value: string | null) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical",
  ).length;

  const runAnalysis = () => {
    startTransition(async () => {
      setError(null);

      try {
        const response = await fetch("/api/aws-logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        setAlerts([]);
        setHasScanned(true);
        setLastScanTime(new Date().toISOString());
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to run CloudGuard analysis.",
        );
      }
    });
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-background">
      <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              CloudGuard Dashboard
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Real-time threat visibility for cloud identities and access paths.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Launch analysis on demand, track critical incidents, and inspect
              suspicious activity with an interface tuned for fast operational response.
            </p>
          </div>
          <RunAnalysisButton isLoading={isPending} onClick={runAnalysis} />
        </div>

        <SummaryCards
          totalAlerts={alerts.length}
          criticalAlerts={criticalAlerts}
          lastScanTime={formatScanTime(lastScanTime)}
        />

        {error ? (
          <Card className="mt-6 border-red-500/30 bg-red-500/10">
            <CardContent className="p-5">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </CardContent>
          </Card>
        ) : null}

        <div className="mt-6 flex-1">
          <AlertTable alerts={alerts} hasScanned={hasScanned} />
        </div>
      </section>
    </main>
  );
}