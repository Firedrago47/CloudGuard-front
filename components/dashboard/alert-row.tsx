"use client";

import { useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { Alert } from "@/components/dashboard/types";

type AlertRowProps = {
  alert: Alert;
};

const severityStyles = {
  Critical: {
    row: "bg-red-500/5 hover:bg-red-500/10",
    badge: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    chip: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
  },
  High: {
    row: "bg-amber-500/5 hover:bg-amber-500/10",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    chip: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
} as const;

function formatDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function AlertRow({ alert }: AlertRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const severityTone = severityStyles[alert.severity];

  return (
    <>
      <TableRow
        data-state={isOpen ? "open" : "closed"}
        className={cn("cursor-pointer", severityTone.row)}
        onClick={() => setIsOpen((open) => !open)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-3">
            <span className={cn("h-2 w-2 rounded-full", severityTone.chip)} />
            <span className="text-foreground">{alert.username}</span>
            <span
              className={cn(
                "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                severityTone.badge,
              )}
            >
              {alert.severity}
            </span>
          </div>
        </TableCell>
        <TableCell className="text-muted-foreground">{alert.alert_type}</TableCell>
        <TableCell className="font-mono text-xs text-foreground sm:text-sm">
          {alert.source_ip}
        </TableCell>
        <TableCell className="font-mono text-xs text-muted-foreground sm:text-sm">
          {formatDate(alert.time_detected)}
        </TableCell>
        <TableCell className="text-foreground">{alert.failure_count}</TableCell>
        <TableCell className="max-w-xs text-muted-foreground">
          {alert.recommended_action}
        </TableCell>
      </TableRow>
      {isOpen ? (
        <TableRow className="bg-muted/50">
          <TableCell colSpan={6} className="px-6 py-5">
            <div className="grid gap-3 md:grid-cols-2">
              <Detail label="Username" value={alert.username} />
              <Detail
                label="Severity"
                value={alert.severity}
                valueClassName={severityTone.text}
              />
              <Detail label="Alert Type" value={alert.alert_type} />
              <Detail label="Source IP" value={alert.source_ip} mono />
              <Detail label="Time Detected" value={alert.time_detected} mono />
              <Detail label="Failure Count" value={String(alert.failure_count)} />
              <Detail
                label="Recommended Action"
                value={alert.recommended_action}
              />
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}

function Detail({
  label,
  value,
  mono = false,
  valueClassName,
}: {
  label: string;
  value: string;
  mono?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-strong p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-sm text-foreground",
          mono && "font-mono",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}