/**
 * Migrates Sanity theme documents from old 26+ color fields to the new
 * 5-seed + 6-override schema.
 *
 * Run:  node scripts/migrate-themes.mjs
 *
 * Reads SANITY_API_READ_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET from .env.local.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = resolve(__dirname, "../.env.local");
  const lines = readFileSync(envPath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const env = loadEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-13",
  token: env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

// Fetch all theme documents with ALL fields (including old ones)
const query = `*[_type == "theme"]{ _id, name, slug, brand, bg, surface, accent, muted, brandBtn, onBrand, onTextDark, bgGlowA, bgGlowB, themeColor, bgBase1, bgBase2, bgBase3, brandRed, brandRedDark, brandPink, brandPinkDeep, brandPinkMid, bgPrimary, bgSurface, bgGlass, bgGlassStrong, bgGlassSoft, bgPinkTint, bgFooter, textDark, textMuted, textFaint, borderGlass, borderGlassSoft, borderPink, borderSubtle, dropBrandStrong, dropBrandSoft }`;

const themes = await client.fetch(query);
console.log(`Found ${themes.length} theme(s)\n`);

// Mapping: old field -> new seed/override field
// Seeds: brand, bg, surface, accent, muted
// Overrides: brandBtn, onBrand, onTextDark, bgGlowA, bgGlowB, themeColor

for (const theme of themes) {
  console.log(`--- ${theme.name} (${theme.slug?.current}) ---`);
  console.log(`  _id: ${theme._id}`);

  // Check which new seed fields are already set
  const hasSeeds = !!(theme.brand && theme.bg && theme.surface && theme.accent && theme.muted);
  console.log(`  Has all 5 seeds: ${hasSeeds}`);

  // Check which old fields exist
  const oldFields = [
    "bgBase1", "bgBase2", "bgBase3", "brandRed", "brandRedDark",
    "brandPink", "brandPinkDeep", "brandPinkMid", "bgPrimary", "bgSurface",
    "bgGlass", "bgGlassStrong", "bgGlassSoft", "bgPinkTint", "bgFooter",
    "textDark", "textMuted", "textFaint", "borderGlass", "borderGlassSoft",
    "borderPink", "borderSubtle", "dropBrandStrong", "dropBrandSoft",
  ];

  const presentOldFields = oldFields.filter((f) => theme[f]);
  if (presentOldFields.length > 0) {
    console.log(`  Old fields present: ${presentOldFields.join(", ")}`);
  }

  // Build migration patch
  const patch = {};

  // Seeds — map from most likely old field names
  if (!theme.brand) {
    // brand = the main accent/highlight color
    if (theme.brandRed) patch.brand = theme.brandRed;
    else if (theme.brandPink) patch.brand = theme.brandPink;
  }
  if (!theme.bg) {
    // bg = base page background
    if (theme.bgBase1) patch.bg = theme.bgBase1;
    else if (theme.bgPrimary) patch.bg = theme.bgPrimary;
  }
  if (!theme.surface) {
    // surface = card/panel background
    if (theme.bgSurface) patch.surface = theme.bgSurface;
    else if (theme.bgBase2) patch.surface = theme.bgBase2;
  }
  if (!theme.accent) {
    // accent = secondary/deep accent
    if (theme.brandPinkDeep) patch.accent = theme.brandPinkDeep;
    else if (theme.brandPinkMid) patch.accent = theme.brandPinkMid;
  }
  if (!theme.muted) {
    // muted = muted variant for borders
    if (theme.borderPink) patch.muted = theme.borderPink;
    else if (theme.textMuted) patch.muted = theme.textMuted;
  }

  // Overrides — same names, just ensure they're set
  if (!theme.brandBtn && theme.brandRed) patch.brandBtn = theme.brandRed;
  if (!theme.onBrand) {} // skip — derived from brand+bg
  if (!theme.onTextDark && theme.bgSurface) patch.onTextDark = theme.bgSurface;
  if (!theme.bgGlowA && theme.brandRed) {
    // bgGlowA was typically brand with low alpha — we can't derive it, skip
  }
  if (!theme.bgGlowB && theme.bgBase1) {
    // bgGlowB was typically black with low alpha — skip
  }

  const hasChanges = Object.keys(patch).length > 0;
  if (!hasChanges) {
    console.log(`  → Already migrated (all seeds set) or no old fields to map\n`);
    continue;
  }

  console.log(`  Patch to apply:`, patch);
  console.log(`  → Would patch ${theme._id}`);

  await client.patch(theme._id).set(patch).commit();
}

console.log("\n--- Migration complete ---");
console.log("Note: requires an Editor-role API token (SANITY_API_READ_TOKEN).");
