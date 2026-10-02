# UNIUS

**Live site:** [https://unius-tan.vercel.app](https://unius-tan.vercel.app)

UNIUS is a searchable directory of CS / Software Engineering / Information Science PhD faculty across 200+ US universities — built to help prospective PhD applicants find funded advisors, labs, and research fits.

## Stack

- Static HTML/JS site (no build step) deployed on [Vercel](https://vercel.com)
- [Supabase](https://supabase.com) Postgres database (`faculty` table) as the data backend, queried client-side via `supabase-js`

## Data

Faculty records (name, university, department, title, email, homepage/lab URLs, research areas, funding signal, source URL) were collected via research agents from public university directory and lab pages. Data is read-only on the client; `research_areas` and `funding_signal` power search and filtering.

## Local development

Just open `index.html` in a browser, or serve the directory with any static file server:

```bash
npx serve .
```
