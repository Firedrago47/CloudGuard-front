# CloudGuard Backend

Next.js dashboard that shows what the CloudGuard backend found. Alerts, IAM user status, severity breakdown – all in one place.

## What you get

**Dashboard** – four summary cards at the top (total alerts, breakdown by type, IAM posture, last scan time). Below that, a bar chart distribution and a full alert table with expandable rows.

**IAM users** – lists every IAM user with a green/red dot for MFA status, their ARN, creation date, and a compliance progress bar.

**Alerts** – expandable table rows showing severity (Critical/High with color coding), source IP, timestamps, and recommended actions.

**Light/dark mode** – toggle in the header. Remembers your preference. Works with system settings out of the box.

## Pages

| Route | What's there |
|-------|-------------|
| `/` | Overview – what the project does, detection rules, pipeline |
| `/dashboard` | The main thing – analysis results, users, alerts |

## Running it

```bash
npm install
npm run dev
```

That's it. It expects the Python backend at `http://localhost:8000` by default. You can change that with `PYTHON_SERVER_URL`.

## How it talks to the backend

The frontend proxies everything through Next.js API routes so you don't have to deal with CORS:

| Frontend route | Backend route | When |
|---------------|--------------|------|
| `POST /api/aws-logs` | `POST /analyze` | Click "Run Analysis" |
| `GET /api/aws-logs` | `GET /history` | On page load |
| `GET /api/aws-logs/users` | `GET /users` | After analysis + page load |

## What's where

```
app/globals.css          – theme colors, light + dark
app/layout.tsx           – fonts, providers, shell
components/app-shell.tsx – header with nav + theme toggle
components/dashboard/    – all dashboard pieces
components/ui/           – button, card, table, theme toggle
```

The theme uses Tailwind v4 custom properties. Classes like `bg-background`, `text-foreground`, `border-border` work everywhere.

## Build

```bash
npm run build
npm start