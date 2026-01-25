# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js portfolio project. The integration includes both client-side and server-side event tracking across key user interactions including contact form submissions, social link clicks, invoice management, and project exploration.

## Summary of Changes

### Core Setup
- **PostHogProvider** (`components/PostHogProvider.tsx`) - Updated with `defaults: '2025-05-24'` for modern configuration
- **Server-side client** (`lib/posthog-server.ts`) - New helper for server-side event tracking in API routes
- **Environment variables** (`.env.local`) - Updated PostHog API key

### Client-side Tracking Components
- **TrackedProjectLink** (`components/TrackedProjectLink.tsx`) - New client component for tracking project link clicks

## Events Table

| Event Name | Description | File(s) |
|------------|-------------|---------|
| `contact_form_submitted` | User successfully submits the contact form | `components/Form.tsx` |
| `contact_form_failed` | Contact form submission failed | `components/Form.tsx` |
| `contact_email_sent` | Contact form email delivered (server-side) | `app/api/send-email/route.tsx` |
| `contact_email_failed` | Contact form email failed (server-side) | `app/api/send-email/route.tsx` |
| `social_link_clicked` | User clicks a social media link | `components/sections/Contact.tsx` |
| `project_link_clicked` | User clicks to visit a project's external site | `components/TrackedProjectLink.tsx`, `app/projects/[slug]/page.tsx` |
| `invoice_login_succeeded` | User successfully logged into invoice portal | `app/invoices/login/page.tsx`, `app/api/invoices/auth/route.ts` |
| `invoice_login_failed` | Invoice portal login failed | `app/invoices/login/page.tsx`, `app/api/invoices/auth/route.ts` |
| `invoice_login_rate_limited` | Login attempts rate limited (server-side) | `app/api/invoices/auth/route.ts` |
| `invoice_created` | New invoice created | `components/invoices/InvoiceEditor.tsx`, `app/api/invoices/route.ts` |
| `invoice_updated` | Existing invoice updated | `components/invoices/InvoiceEditor.tsx`, `app/api/invoices/route.ts` |
| `invoice_email_sent` | User sends invoice email to client | `components/invoices/InvoiceEditor.tsx` |
| `invoice_email_delivered` | Invoice email successfully delivered (server-side) | `app/api/invoices/email/route.ts` |
| `invoice_email_failed` | Invoice email failed (server-side) | `app/api/invoices/email/route.ts` |
| `client_created` | New client created in invoice system | `components/invoices/InvoiceEditor.tsx` |
| `client_updated` | Existing client updated | `components/invoices/InvoiceEditor.tsx` |
| `transform_executed` | User runs a Sanity transform action | `app/transform/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/124462/dashboard/1126484) - Core analytics dashboard for tracking user behavior

### Insights
- [Contact Form Conversions](https://us.posthog.com/project/124462/insights/tp9cUNME) - Tracks successful contact form submissions over time
- [Invoice Lifecycle Funnel](https://us.posthog.com/project/124462/insights/uZmh6M0v) - Tracks invoice creation to email delivery conversion funnel
- [Social Engagement by Platform](https://us.posthog.com/project/124462/insights/jYfox1zZ) - Breakdown of social link clicks by platform
- [Invoice Portal Security](https://us.posthog.com/project/124462/insights/g0KkckJJ) - Monitors login attempts, failures, and rate limiting events
- [Project Interest](https://us.posthog.com/project/124462/insights/spNKlP4M) - Tracks which projects users are most interested in visiting

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
