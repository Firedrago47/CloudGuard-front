export type Alert = {
  username: string;
  alert_type: string;
  severity: "Critical" | "High";
  source_ip: string;
  time_detected: string;
  failure_count: number;
  recommended_action: string;
};

export type StoredAlert = Alert & {
  first_detected?: string;
  last_seen?: string;
};

export type IAMUser = {
  username: string;
  created_date: string;
  mfa_enabled: boolean;
  arn: string;
};

export type AlertMetrics = {
  totalAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  bruteForceAlerts: number;
  missingMfaAlerts: number;
  overPermissiveAlerts: number;
  uniqueUsers: number;
  noMfaUsers: number;
  mfaCompliant: number;
  totalUsers: number;
};