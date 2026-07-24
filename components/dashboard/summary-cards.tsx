import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryCardsProps = {
  totalAlerts: number;
  criticalAlerts: number;
  lastScanTime: string | null;
};

export function SummaryCards({
  totalAlerts,
  criticalAlerts,
  lastScanTime,
}: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Total Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight text-foreground">
            {totalAlerts}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Critical Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight text-red-600 dark:text-red-400">
            {criticalAlerts}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Last Scan Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-sm text-muted-foreground sm:text-base">
            {lastScanTime ?? "Not yet scanned"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}