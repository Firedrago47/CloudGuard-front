import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flowSteps = [
  {
    num: "01",
    title: "AWS CloudTrail",
    desc: "Ingests user activity, API calls, and sign-in events from the AWS environment.",
  },
  {
    num: "02",
    title: "Detection Engine",
    desc: "Python-based analysis for brute-force logins, root account usage, IAM misconfigurations, and missing MFA.",
  },
  {
    num: "03",
    title: "Live Dashboard",
    desc: "Next.js frontend renders findings with severity-based alerting and expandable incident details.",
  },
];

const capabilities = [
  {
    title: "Brute-force detection",
    desc: "Time-windowed analysis of repeated failed login attempts across CloudTrail console login events.",
  },
  {
    title: "Root account monitoring",
    desc: "Alerts when the root user performs sensitive actions outside expected usage patterns.",
  },
  {
    title: "IAM least-privilege audit",
    desc: "Identifies users with overly permissive policies granting full Action and Resource wildcard access.",
  },
  {
    title: "MFA compliance check",
    desc: "Scans all IAM users and flags those who have not enabled multi-factor authentication.",
  },
];

export function OverviewPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-background">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cloud Security Project
          </div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            CloudGuard
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            A hands-on AWS security monitoring project that transforms noisy
            CloudTrail activity logs into focused, reviewable detections — with
            real-time visibility into IAM user posture.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild className="px-6 py-3 text-sm font-semibold tracking-wider">
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="px-6 py-3 text-sm font-semibold"
            >
              <a href="https://github.com/Firedrago47/CloudGuard-front" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Stats / highlights */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { value: "4", label: "Detection Rules" },
            { value: "Real-time", label: "On-Demand Analysis" },
            { value: "IAM + CT", label: "Data Sources" },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="py-6">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: How it works */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">How it works</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              From log ingestion to dashboard rendering in three steps.
            </p>
            <div className="mt-6 space-y-6">
              {flowSteps.map((step, i) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-xs font-semibold text-foreground">
                    {step.num}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                    {i < flowSteps.length - 1 && (
                      <div className="mt-4 ml-5 h-6 w-px bg-border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detection capabilities */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">Detection capabilities</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Rules that currently ship with CloudGuard.
            </p>
            <div className="mt-6 space-y-3">
              {capabilities.map((cap) => (
                <Card key={cap.title}>
                  <CardContent className="flex gap-3 p-4">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{cap.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-accent/30 bg-accent/5">
            <CardContent className="py-8 px-10">
              <p className="text-base font-semibold text-foreground">
                Ready to run a security analysis?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Open the dashboard, click Run Analysis, and review findings instantly.
              </p>
              <Button asChild className="mt-6 px-6 py-3 text-sm font-semibold tracking-wider">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}