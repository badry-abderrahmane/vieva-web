# Quote API contract

The front end posts quote requests to `VITE_QUOTE_ENDPOINT`. `server/index.mjs` is a dependency-free reference implementation (Node 20+). The production target in the specification is Laravel 11 with a Filament admin. Implement the same contract there.

## POST /api/quotes

`multipart/form-data`. Returns `201 {"id": "<uuid>"}`.

| Field | Notes |
|---|---|
| `lang` | `fr`, `en` or `ar` |
| `services[]` | repeated; service slugs (`impression-grand-format`, `evenementiel`, ...) |
| `product`, `width`, `height`, `qty`, `material`, `install`, `date`, `city`, `mode`, `comment` | free text, 2,000 characters max each |
| `name`, `company`, `role`, `phone`, `email`, `ice` | `name` and (`phone` or `email`) required; email format checked |
| `basket` | JSON array of `{slug, name, service}` from the catalogue basket |
| `files` | repeated; PDF, AI, PNG, JPG; 50 MB each; 10 files max |
| `website` | honeypot; if filled the request is accepted and discarded |

Errors: `422` (`missing_contact`, `bad_email`, `bad_file`), `429` (`rate_limited`, 10 requests per hour per IP), `400` (`bad_form`).

## Admin (reference server only)

`GET /admin` lists leads with a status selector (New, Contacted, Quoted, Won, Lost). `GET /admin/export.csv` exports them. HTTP basic auth from `ADMIN_USER` and `ADMIN_PASSWORD`; both must be set or the routes return 503.

## Notifications

If `WEBHOOK_URL` is set, the server posts `{"text": "New quote from ..."}` for each lead. Point it at a WhatsApp Cloud API or Twilio bridge, or an email relay. The specification asks for an email to the client and a notification email plus WhatsApp alert to the team.

## Production checklist (Laravel + Filament)

- Signed upload URLs to S3-compatible storage, virus scan on upload.
- Queued jobs for emails and WhatsApp.
- Lead model with the statuses above, CSV export, lead inbox resource in Filament.
- CAPTCHA-free spam protection (honeypot and rate limit are already in the contract).
- Separate database from Ageno.

## Ageno integration (not started)

The specification calls for a nightly read-only catalogue sync and creating a client in Ageno when a lead is marked Won. This needs an API endpoint or a read-only database user on the Ageno side, plus the category mapping. Nothing here touches Ageno.
