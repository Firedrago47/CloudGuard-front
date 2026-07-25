import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IAMUser } from "@/components/dashboard/types";

type UserCardsProps = {
  users: IAMUser[];
  isLoading: boolean;
};

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function UserCards({ users, isLoading }: UserCardsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>IAM Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent mr-2" />
            Loading users...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>IAM Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Run an analysis to load IAM user data.
          </p>
        </CardContent>
      </Card>
    );
  }

  const mfaCount = users.filter((u) => u.mfa_enabled).length;
  const noMfaCount = users.length - mfaCount;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border">
        <div>
          <CardTitle>IAM Users</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {users.length} user{users.length !== 1 ? "s" : ""} &middot;{" "}
            <span className="text-emerald-600 dark:text-emerald-400">{mfaCount} MFA enabled</span>
            {noMfaCount > 0 && (
              <span className="text-red-600 dark:text-red-400">
                {" "}&middot; {noMfaCount} MFA disabled
              </span>
            )}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {users.map((user) => (
            <div
              key={user.username}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    user.mfa_enabled
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {user.arn}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-xs font-mono text-foreground">
                    {formatDate(user.created_date)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    user.mfa_enabled
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
                  }`}
                >
                  {user.mfa_enabled ? "MFA On" : "No MFA"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}