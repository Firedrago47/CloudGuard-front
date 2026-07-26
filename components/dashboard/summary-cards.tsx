import { Card, CardContent } from "@/components/ui/card";
import type { AlertMetrics } from "@/components/dashboard/types";

type SummaryCardsProps = AlertMetrics & {
  lastScanTime: string | null;
};

const statCards = [
  {
    key: "total",
    title: "Total Alerts",
    getValue: (m: AlertMetrics) => String(m.totalAlerts),
    getMeta: (m: AlertMetrics) => (
      <div className="flex gap-3 text-xs">
        <span className="text-red-600 dark:text-red-400">{m.criticalAlerts} critical</span>
        <span className="text-amber-600 dark:text-amber-400">{m.highAlerts} high</span>
      </div>
    ),
  },
  {
    key: "types",
    title: "By Type",
    getValue: () => null,
    getMeta: (m: AlertMetrics) => (
      <div className="space-y-1 text-sm">
        {[
          ["Brute Force", m.bruteForceAlerts],
          ["Missing MFA", m.missingMfaAlerts],
          ["Permissive", m.overPermissiveAlerts],
        ].map(([label, count]) => (
          <div key={label as string} className="flex justify-between">
            <span className="text-muted-foreground">{label as string}</span>
            <span className="font-mono font-medium text-foreground">{count}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "iam",
    title: "IAM Posture",
    getValue: (m: AlertMetrics) => String(m.totalUsers),
    getMeta: (m: AlertMetrics) => (
      <>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-600 dark:text-emerald-400">{m.mfaCompliant} MFA on</span>
          <span className="text-red-600 dark:text-red-400">{m.noMfaUsers} MFA off</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {m.uniqueUsers} with alerts
        </p>
      </>
    ),
  },
  {
    key: "scan",
    title: "Last Scan",
    getValue: () => null,
    getMeta: (m: AlertMetrics, lastScanTime: string | null) => (
      <div>
        <p className="font-mono text-sm text-foreground">
          {lastScanTime ?? "Not yet scanned"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {lastScanTime ? "Analysis complete" : "Run analysis to begin"}
        </p>
      </div>
    ),
  },
];

export function SummaryCards(props: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statCards.map((card) => (
        <Card key={card.key}>
          <CardContent className="p-4">
            <p className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {card.title}
            </p>
            {card.getValue(props) !== null ? (
              <p className="text-2xl font-bold text-foreground mb-1.5">
                {card.getValue(props)}
              </p>
            ) : null}
            {card.getMeta(props, props.lastScanTime)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}