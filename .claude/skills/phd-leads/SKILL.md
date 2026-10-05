---
name: phd-leads
description: Turn LinkedIn PhD-position posts the user pastes into researched leads, tailored outreach emails (and LaTeX SOPs / cover letters when the position asks for one), and queue them 5 per day in the Supabase `phd_leads` table that the "PhD leads" tab of outreach-admin.html sends from. Use when the user shares PhD openings, LinkedIn posts about PhD positions, or says "make the list" / "add these leads".
---

# PhD leads from LinkedIn

Supabase project: `mdgasifbbuwizvqsomwg` (use the Supabase MCP tools; `execute_sql` for reads/inserts).
Sending is done by the `send-outreach` edge function (pg_cron `send-outreach-sweep`, every 5 min): it sends
`phd_leads` rows whose batch in `phd_batches` is `approved`, `status='pending'`, `contact_channel='email'`, and
`scheduled_at <= now()`. CV (`outreach/cv.pdf`) is always attached; `attachment_path` (in the `outreach` bucket)
adds one more PDF. When the position requires a document (research statement, SOP, cover letter, transcript), set
`needs_attachment` to what is needed (e.g. `'research statement'`) — the lead will not send until a PDF is attached;
if several documents are needed, ask the user to merge them into one PDF.
Record dead leads (deadline passed, ineligible citizenship, not a PhD position) with `status='skipped'` and the reason
in `research_notes`, so they are not re-added. The user approves each batch in the admin panel — never set a batch to `approved` yourself.

## 1. Collect (when the user pastes posts)

For each post extract: PI name + title, university, department, country, position title, research topic,
funding, deadline, contact email, LinkedIn post URL. Keep the raw post text for `raw_post`.

## 2. Research every lead on the web (always, not only when the email is missing)

- Find the PI's university profile / lab page → `homepage_url`, official email (prefer the university page over the post).
- Read 2–3 recent papers or projects → concrete hooks for the email; save a short summary in `research_notes`.
- Find the official position / application page → requirements, whether an SOP / cover letter / research proposal
  is required, deadline, funding.
- No email anywhere → `contact_channel='linkedin'` (or `'portal'` if applying via an application system),
  `status='manual'`, write a short LinkedIn DM (≤ 600 chars) in `body`, leave `subject` null. Manual leads take no slot.
- Skip duplicates: check `phd_leads` (by `lower(recipient_email)`) and `outreach_emails`/`faculty` (by email) first
  and tell the user if the PI was already contacted.
- Never invent facts, papers, or email addresses. If something can't be verified, say so in `research_notes`.

## 3. Draft the email

Match the voice of the existing professor emails (`select body from outreach_emails limit 1` for the applicant
profile: G. M. Mozahad, B.Sc. CSE IIUC, 3+ yrs at Brain Station 23, 1500+ problems / ICPC, PIDM manuscript,
Moodle Proctoring, federated continual learning manuscript; signs "Sincerely, G. M. Mozahad, Dhaka, Bangladesh").
Differences for leads: reference the specific advertised position and where it was seen ("your LinkedIn post about
the funded PhD position in …"), cite 1–2 of the PI's actual recent works from research, pick only the applicant
projects that genuinely fit, mention the attached CV (and SOP if attached). ≤ 300 words, plain text.
Subject: `PhD Position – <position/topic> – G. M. Mozahad`.

## 4. SOP / cover letter (only when the position asks for one)

Template: `select content from phd_templates where name='sop'` (uploaded by the user from the admin panel).
If missing, ask the user to upload `G_M_Mozahad_SOP.tex` via the admin panel. Keep the template's preamble,
layout and macros exactly; rewrite only the content for this position/PI. Store the full .tex in `sop_tex`.
The user downloads it from the admin panel, compiles it, and attaches the PDF with "Attach PDF" (sets
`attachment_path`). If you can compile it yourself (pdflatex available), upload is still done by the user.

## 5. Schedule — 5 emails per day

- Fill the earliest `batch_date` (>= today, or tomorrow if today's batch is already approved) that has fewer than
  5 email leads; create `phd_batches` rows as needed (`insert ... on conflict do nothing`).
- Sort by deadline (soonest first) so urgent positions go out first.
- `slot` 1–5 per batch; `scheduled_at` in the recipient's local morning, ≥ 25 min apart:
  Europe ≈ 07:30–09:30 UTC, North America ≈ 13:30–15:30 UTC, East Asia/Australia ≈ 00:30–02:30 UTC,
  Middle East/South Asia ≈ 04:30–06:30 UTC.
- Insert with `status='pending'`. Use dollar-quoting (`$b$...$b$`) for text fields.

## 6. Report back

Show the user a table per batch date: slot, PI, university, position, deadline, email (or "manual – LinkedIn"),
SOP needed (yes/no). Remind them to open the **PhD leads** tab, review/edit, attach any SOP PDF, and press
**Approve** on the day to start sending.
