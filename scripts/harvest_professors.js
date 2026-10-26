// scripts/harvest_professors.js
// Automated ingestion and verification pipeline for UNIUS global faculty expansion.

const https = require("https");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://mdgasifbbuwizvqsomwg.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY in your environment (never commit it).");
  process.exit(1);
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function upsertBatch(records) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(records);
    const req = https.request(`${SUPABASE_URL}/rest/v1/faculty`, {
      method: "POST",
      headers: {
        "apikey": SERVICE_KEY,
        "Authorization": "Bearer " + SERVICE_KEY,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
        "Content-Length": Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(records.length);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function ingestFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  const items = Array.isArray(data) ? data : [data];
  
  const validated = items.map(item => {
    const id = item.id || `${slugify(item.university)}-${slugify(item.name)}`;
    return {
      id,
      university: item.university,
      department: item.department || "Department of Computer Science",
      name: item.name,
      title: item.title || "Professor",
      email: item.email || null,
      homepage_url: item.homepage_url || null,
      lab_url: item.lab_url || null,
      research_areas: item.research_areas || [],
      funding_signal: item.funding_signal || "recruiting",
      source_url: item.source_url || null
    };
  });

  const batchSize = 50;
  for (let i = 0; i < validated.length; i += batchSize) {
    const chunk = validated.slice(i, i + batchSize);
    await upsertBatch(chunk);
    console.log(`Ingested ${i + chunk.length} / ${validated.length} records`);
  }
}

if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.log("Usage: node scripts/harvest_professors.js <path-to-json-data>");
    process.exit(0);
  }
  ingestFile(target).catch(console.error);
}

module.exports = { upsertBatch, slugify };
