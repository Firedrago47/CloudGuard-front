import { NextResponse } from "next/server";

const PYTHON_SERVER_URL =
  process.env.PYTHON_SERVER_URL ?? "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(`${PYTHON_SERVER_URL}/users`, {
      method: "GET",
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

    const users = await response.json();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch users from the Python server.",
      },
      { status: 500 },
    );
  }
}