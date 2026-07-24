import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AlertRow } from "@/components/dashboard/alert-row";
import type { Alert } from "@/components/dashboard/types";

type AlertTableProps = {
  alerts: Alert[];
  hasScanned: boolean;
};

export function AlertTable({ alerts, hasScanned }: AlertTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border">
        <div>
          <CardTitle>Alert Stream</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Expanded incident telemetry from the latest CloudGuard analysis.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {alerts.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {hasScanned ? "No issues detected" : "Awaiting analysis"}
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {hasScanned ? "Infrastructure looks clean." : "Run a scan to populate alerts."}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {hasScanned
                ? "CloudGuard did not surface any suspicious activity in the latest response."
                : "When the analysis completes, CloudGuard will surface user, network, and IAM findings here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Username</TableHead>
                  <TableHead>Alert Type</TableHead>
                  <TableHead>Source IP</TableHead>
                  <TableHead>Time Detected</TableHead>
                  <TableHead>Failure Count</TableHead>
                  <TableHead>Recommended Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <AlertRow
                    key={`${alert.username}-${alert.alert_type}-${alert.time_detected}-${index}`}
                    alert={alert}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}