import { Card, CardContent } from "@/components/ui/card";
import type { Alert } from "@/components/dashboard/types";

type AlertDistributionProps = {
  alerts: Alert[];
};

export function AlertDistribution({ alerts }: AlertDistributionProps) {
  if (alerts.length === 0) return null;

  const bruteForce = alerts.filter((a) => a.alert_type === "Brute Force Login Attempt").length;
  const missingMfa = alerts.filter((a) => a.alert_type === "Missing MFA").length;
  const overPermissive = alerts.filter((a) => a.alert_type === "Overly Permissive IAM Policy").length;
  const other = alerts.length - bruteForce - missingMfa - overPermissive;

  const buckets = [
    { label: "Brute Force", count: bruteForce, bar: "bg-red-500" },
    { label: "Missing MFA", count: missingMfa, bar: "bg-amber-500" },
    { label: "Overly Permissive", count: overPermissive, bar: "bg-orange-500" },
  ];

  if (other > 0) buckets.push({ label: "Other", count: other, bar: "bg-slate-400" });

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Alert Distribution
        </p>
        <div className="space-y-3">
          {buckets.map((bucket) => (
            <div key={bucket.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{bucket.label}</span>
                <span className="text-xs font-mono text-muted-foreground">{bucket.count}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${bucket.bar} transition-all duration-500`}
                  style={{ width: `${(bucket.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}