# ISR + Sanity Webhook Setup

This project uses Next.js ISR (Incremental Static Regeneration) with Sanity webhooks for on-demand cache invalidation.

## Current ISR Configuration

- **Homepage**: Revalidates every 60 seconds
- **Project pages**: Revalidates every 3600 seconds (1 hour)

## Webhook Setup

### 1. Generate a Webhook Secret

Generate a secure random string for your webhook secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Add to Environment Variables

Add to `.env.local` or your hosting provider's environment variables:

```bash
SANITY_WEBHOOK_SECRET=your-generated-secret-here
```

### 3. Configure Sanity Webhook

1. Go to your Sanity project dashboard at https://www.sanity.io/manage/project/zvfxtzrz/api/webhooks
2. Click **Add webhook**
3. Configure:

   - **Name**: Production Revalidation
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **HTTP Method**: POST
   - **Headers** (if your Sanity plan supports it): `sanity-webhook-secret: YOUR_SECRET`
   - **Projection**: Leave empty (sends full document)
   - **Filter**: `_type in ["project", "about", "experience", "tech", "iknow"]`
   - **Triggers**: Select all (create, update, delete, publish, unpublish)
   - **Dataset**: `production`
   - **Description**: Triggers ISR revalidation when content changes

4. Click **Create webhook**

### 4. Test the Webhook

Make a content change in Sanity and check:
- Server logs show revalidation: `Revalidation triggered for project: ...`
- Your site updates immediately (not after the revalidation period)

## How It Works

1. **Automatic Revalidation**: ISR revalidates based on time (60s for home, 1h for projects)
2. **On-Demand Revalidation**: When content changes in Sanity, webhook triggers immediate cache clear
3. **Signature Verification**: Uses `next-sanity`'s `parseBody` to verify webhook authenticity
4. **Type-Specific Invalidation**: Different content types trigger targeted revalidation

## Webhook Routes

- `/api/revalidate` - Main webhook handler
  - Verifies webhook signature using `next-sanity/webhook`
  - Revalidates specific paths based on content type:
    - `project`: `/`, `/projects/[slug]`, `/projects`
    - `about`, `experience`, `tech`, `iknow`: `/`
  - Returns success/failure status with timestamp
  - Also supports GET for health checks

## Content Type Mappings

| Content Type | Paths Revalidated |
|--------------|-------------------|
| `project` | `/`, `/projects/[slug]`, `/projects` |
| `about` | `/` |
| `experience` | `/` |
| `tech` | `/`, `/projects` |
| `iknow` | `/` |

## Troubleshooting

**Webhook failing with 401?**
- Check `SANITY_WEBHOOK_SECRET` matches Sanity webhook secret
- Verify environment variable is set on your hosting platform (Vercel/Netlify)
- Check Sanity webhook headers (if your plan supports webhook headers)

**Content not updating?**
- Check server logs: `Revalidation triggered for...`
- Verify webhook is enabled in Sanity dashboard
- Test webhook health: `curl https://yourdomain.com/api/revalidate`
- Check filter in Sanity webhook matches your content types

**Invalid signature error?**
- Ensure webhook secret is correctly set in both places:
  1. `.env.local` (or hosting env vars)
  2. Sanity webhook configuration

**Rate limiting?**
- Sanity webhooks have rate limits. Bulk updates may be delayed.
- Consider batching content changes.

**Next.js version conflict?**
- Uses `next-sanity@^12` which supports Next.js 16
- If you see peer dependency warnings, add to package.json overrides
