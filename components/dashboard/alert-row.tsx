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
    row: "bg-red-500/[0.03] hover:bg-red-500/[0.06]",
    badge: "border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400",
    chip: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
  },
  High: {
    row: "bg-amber-500/[0.03] hover:bg-amber-500/[0.06]",
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    chip: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
} as const;

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function AlertRow({ alert }: AlertRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const s = severityStyles[alert.severity];

  return (
    <>
      <TableRow
        data-state={isOpen ? "open" : "closed"}
        className={cn("cursor-pointer", s.row)}
        onClick={() => setIsOpen((open) => !open)}
      >
        <TableCell className="py-3">
          <div className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full", s.chip)} />
            <span className="text-sm font-medium text-foreground">{alert.username}</span>
            <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", s.badge)}>
              {alert.severity}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-3 text-sm text-muted-foreground">{alert.alert_type}</TableCell>
        <TableCell className="py-3 font-mono text-xs text-foreground">{alert.source_ip ?? "—"}</TableCell>
        <TableCell className="py-3 font-mono text-xs text-muted-foreground">{formatDate(alert.time_detected)}</TableCell>
        <TableCell className="py-3 text-sm text-foreground">{alert.failure_count ?? "—"}</TableCell>
        <TableCell className="py-3 max-w-xs text-sm text-muted-foreground">{alert.recommended_action}</TableCell>
      </TableRow>
      {isOpen && (
        <TableRow className="bg-muted/30">
          <TableCell colSpan={6} className="px-4 py-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <Detail label="Username" value={alert.username} />
              <Detail label="Severity" value={alert.severity} valueClassName={s.text} />
              <Detail label="Alert Type" value={alert.alert_type} />
              <Detail label="Source IP" value={alert.source_ip ?? "—"} mono />
              <Detail label="Detected" value={alert.time_detected} mono />
              <Detail label="Failure Count" value={String(alert.failure_count ?? "—")} />
              <Detail label="Recommended Action" value={alert.recommended_action} className="sm:col-span-2" />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function Detail({
  label,
  value,
  mono = false,
  valueClassName,
  className,
}: {
  label: string;
  value: string;
  mono?: boolean;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface-strong p-3", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className={cn("text-sm text-foreground", mono && "font-mono", valueClassName)}>
        {value}
      </p>
    </div>
  );
}