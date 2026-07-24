import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cloud Security Project
          </div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            CloudGuard
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
            A hands-on AWS security monitoring project for turning noisy activity
            logs into focused, reviewable detections.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <Card>
            <CardHeader>
              <CardTitle>What CloudGuard Solves</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
              <section>
                <h2 className="text-base font-semibold text-foreground">The problem</h2>
                <p className="mt-2">
                  Cloud environments generate a large stream of activity logs, and
                  reviewing those records manually is slow, repetitive, and easy to
                  miss when you are looking for real security issues.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  What this tool does today
                </h2>
                <p className="mt-2">
                  CloudGuard pulls real AWS CloudTrail login activity through
                  `boto3`, applies detection logic for time-windowed brute-force
                  login behavior and root account usage, then shows the findings in
                  a live dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  How it works
                </h2>
                <p className="mt-2">
                  At a high level, the flow is: AWS CloudTrail produces the logs,
                  Python detection logic in a FastAPI backend analyzes them, and the
                  Next.js dashboard renders the results when analysis is triggered
                  on demand with the `Run Analysis` button.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">Coming next</h2>
                <p className="mt-2">
                  Planned additions include IAM misconfiguration detection, missing
                  MFA detection, and more advanced severity-based alerting as the
                  detection set expands.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">Why this exists</h2>
                <p className="mt-2">
                  This project is built to gain practical experience with real AWS
                  security services and SOC-style detection logic, especially in
                  areas that align with AWS Security Specialty concepts.
                </p>
              </section>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle>Current Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-foreground">
                  <div className="rounded-lg border border-border bg-surface-strong p-4">
                    AWS CloudTrail
                  </div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="rounded-lg border border-border bg-surface-strong p-4">
                    FastAPI + Python detection logic
                  </div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="rounded-lg border border-border bg-surface-strong p-4">
                    Next.js live dashboard
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explore The Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">
                  Open the working analysis view to run the backend detection flow,
                  inspect alert counts, and expand individual findings.
                </p>
                <Button asChild className="w-full justify-center py-3">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}