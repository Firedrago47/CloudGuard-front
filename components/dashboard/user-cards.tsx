import { Card, CardContent } from "@/components/ui/card";
import type { IAMUser } from "@/components/dashboard/types";

type UserCardsProps = {
  users: IAMUser[];
  isLoading: boolean;
};

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

export function UserCards({ users, isLoading }: UserCardsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
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
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Run an analysis to load IAM user data.</p>
        </CardContent>
      </Card>
    );
  }

  const mfaCount = users.filter((u) => u.mfa_enabled).length;
  const noMfaCount = users.length - mfaCount;
  const mfaPercent = Math.round((mfaCount / users.length) * 100);

  return (
    <Card>
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            IAM Users
          </p>
          <p className="text-xs text-muted-foreground">{users.length} users</p>
        </div>

        {/* User rows */}
        <div className="divide-y divide-border">
          {users.map((user) => (
            <div key={user.username} className="flex items-center gap-3 px-4 py-2.5">
              <div className={`h-2 w-2 shrink-0 rounded-full ${user.mfa_enabled ? "bg-emerald-500" : "bg-red-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate font-mono">{user.arn}</p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className="text-[11px] text-muted-foreground">Created</p>
                <p className="text-xs font-mono text-foreground">{formatDate(user.created_date)}</p>
              </div>
              <span
                className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                  user.mfa_enabled
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
                }`}
              >
                {user.mfa_enabled ? "MFA" : "No MFA"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}