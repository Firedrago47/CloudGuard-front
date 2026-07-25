export type Alert = {
  username: string;
  alert_type: string;
  severity: "Critical" | "High";
  source_ip: string;
  time_detected: string;
  failure_count: number;
  recommended_action: string;
};

export type IAMUser = {
  username: string;
  created_date: string;
  mfa_enabled: boolean;
  arn: string;
};