# Professionalize Project Plan

## Phase 1 — Fix uncommitted diffs
1. Revert `CommunitySocials.tsx` — done
2. Keep `providers-layout.tsx`, `Footer.tsx`, `LegalLinks.tsx` diffs
3. Translate German comments to English

## Phase 2 — Add Prettier + Tailwind plugin
1. Create `.prettierrc` with `prettier-plugin-tailwindcss`
2. Install the plugin
3. Run prettier across all source files

## Phase 3 — Extract reusable components
| Component | File | Description |
|---|---|---|
| `SocialLinkCard` | `components/ui/SocialLinkCard.tsx` | Card with hover effects, arrow, icon |
| `SocialIconBar` | `components/ui/SocialIconBar.tsx` | Small icon button row |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | Eyebrow + title pattern |

## Phase 4 — Remove duplication
1. Delete `JoinDiscordButton.tsx`, use `<Button>` in `HeroSection.tsx`
2. Replace raw `<a>` buttons in `StrawberryRelease.tsx` with `<Button>`

## Phase 5 — Use CSS theme variables
Replace hardcoded colors with Tailwind theme tokens:
- `#1f171d` → `text-text-dark`
- `#ff4fa8` → `text-brand-red` / `bg-brand-red`
- `#5f4e58` → `text-text-muted`

## Phase 6 — Standardize exports
Convert default exports to named exports across all components, update imports.
