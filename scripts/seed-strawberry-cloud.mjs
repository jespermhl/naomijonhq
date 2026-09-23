import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const lines = readFileSync(resolve(".env.local"), "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[t.slice(0, eq).trim()] = v;
  }
  return env;
}

const env = loadEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-13",
  token: env.SANITY_API_WRITE_TOKEN || env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

// Derived from the pink (#ff4fa8) already in use on the Strawberry theme.
// Light "cloud" palette: soft pink wash, white cards, deep pink accents.
const SEEDS = {
  brand: "#ff4fa8",
  bg: "#ffffff",
  surface: "#fff9fb",
  accent: "#b61e6b",
  muted: "#ff4fa8",
};

try {
  const doc = await client.fetch(
    `*[_type == "theme" && slug.current == "strawberry-cloud"][0]{_id}`,
  );
  if (!doc) throw new Error("strawberry-cloud theme not found");
  await client.patch(doc._id).set(SEEDS).commit();
  console.log(`Patched ${doc._id} with`, SEEDS);
  console.log(JSON.stringify({ tags: ["sanity:theme"], _type: "theme" }));
} catch (err) {
  console.error("PATCH FAILED:", err.message);
  process.exit(1);
}