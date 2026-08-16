import { describe, expect, it } from "vitest";
import { CACHE_TAGS, tagForSanityType } from "@/lib/cache-tags";

describe("tagForSanityType", () => {
  it("maps each known Sanity document type to its cache tag", () => {
    expect(tagForSanityType("theme")).toBe(CACHE_TAGS.theme);
    expect(tagForSanityType("site")).toBe(CACHE_TAGS.site);
    expect(tagForSanityType("redirect")).toBe(CACHE_TAGS.redirect);
    expect(tagForSanityType("social")).toBe(CACHE_TAGS.social);
    expect(tagForSanityType("concert")).toBe(CACHE_TAGS.concert);
    expect(tagForSanityType("perfume")).toBe(CACHE_TAGS.perfume);
  });

  it("returns undefined for unknown or missing types", () => {
    expect(tagForSanityType("post")).toBeUndefined();
    expect(tagForSanityType(undefined)).toBeUndefined();
  });
});
