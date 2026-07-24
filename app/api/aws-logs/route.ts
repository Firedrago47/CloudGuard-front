import { NextResponse } from "next/server";

const PYTHON_SERVER_URL =
  process.env.PYTHON_SERVER_URL ?? "http://localhost:8000";

type Alert = {
  username: string;
  alert_type: string;
  severity?: "Critical" | "High";
  source_ip: string;
  time_detected: string;
  failure_count: number;
  recommended_action: string;
};

function normalizeAlerts(payload: unknown) {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.map((item) => {
    const alert = item as Partial<Alert>;

    return {
      ...alert,
      severity: alert.severity ?? (alert.username === "root" ? "Critical" : "High"),
    };
  });
}

export async function POST() {
  try {
    const response = await fetch(`${PYTHON_SERVER_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Python server returned ${response.status}`,
        },
        { status: response.status },
      );
    }

    const logs = normalizeAlerts(await response.json());

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch logs from the Python server.",
      },
      { status: 500 },
    );
  }
}
