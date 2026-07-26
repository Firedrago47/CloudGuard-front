import { Card, CardContent } from "@/components/ui/card";
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
      <CardContent className="p-0">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-4">
              {hasScanned ? "No issues detected" : "Awaiting analysis"}
            </div>
            <p className="text-base font-semibold text-foreground">
              {hasScanned ? "Infrastructure looks clean." : "Run a scan to populate alerts."}
            </p>
            <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
              {hasScanned
                ? "CloudGuard did not surface any suspicious activity in the latest response."
                : "When the analysis completes, findings will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="py-3">User</TableHead>
                  <TableHead className="py-3">Alert Type</TableHead>
                  <TableHead className="py-3">Source IP</TableHead>
                  <TableHead className="py-3">Detected</TableHead>
                  <TableHead className="py-3">Failures</TableHead>
                  <TableHead className="py-3">Action</TableHead>
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