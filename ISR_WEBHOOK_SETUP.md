# ISR + Sanity Webhook Setup

This project uses Next.js ISR (Incremental Static Regeneration) with Sanity webhooks for on-demand cache invalidation.

## Current ISR Configuration

- **Homepage**: Revalidates every 60 seconds
- **Project pages**: Revalidate every 3600 seconds (1 hour)

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

1. Go to your Sanity project dashboard at https://www.sanity.io/manage
2. Navigate to **API > Webhooks**
3. Click **Add webhook**
4. Configure:

   - **Name**: Production Revalidation
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Secret**: Your generated webhook secret (same as env var)
   - **HTTP Method**: POST
   - **Projection**: `{ "project": { "_id": "", "slug": { "current": "" }, "_type": "" }, "_type": "" }`
   - **Filter**: `!drafts().*`
   - **Description**: Triggers ISR revalidation when content changes

5. Click **Create webhook**

### 4. Test the Webhook

Make a content change in Sanity and check:
- Vercel/Netlify logs show successful revalidation
- Your site updates immediately (not after the revalidation period)

## How It Works

1. **Automatic Revalidation**: ISR revalidates based on time (60s for home, 1h for projects)
2. **On-Demand Revalidation**: When content changes in Sanity, webhook triggers immediate cache clear
3. **Tag-Based Invalidation**: Different content types use tags for efficient cache management

## Webhook Routes

- `/api/revalidate` - Main webhook handler
  - Revalidates all projects on project changes
  - Revalidates home page on about/experience/tech changes
  - Validates webhook secret for security

## Troubleshooting

**Webhook failing with 401?**
- Check `SANITY_WEBHOOK_SECRET` matches Sanity webhook secret
- Verify environment variable is set on your hosting platform

**Content not updating?**
- Check server logs for webhook errors
- Verify webhook is enabled in Sanity
- Test webhook manually: `curl -X POST -H "sanity-webhook-secret: YOUR_SECRET" https://yourdomain.com/api/revalidate -d '{"project": {"_id": "test"}}`

**Rate limiting?**
- Sanity webhooks have rate limits. Bulk updates may be delayed.
- Consider batching content changes.
