import type { ReactElement } from "react";
import { OG_COLORS, OG_SITE_BASE } from "@/lib/og-theme";
import { OgSplitPromoCard, OgStackedBrandCard } from "./layouts";
import {
  OgCanvas,
  OgFramedCover,
  OgSquareThumb,
  OgSticker,
} from "./primitives";
import {
  OgBody,
  OgCoverSlot,
  OgDisplayTitle,
  OgEmojiHero,
  OgGlyph,
  OgKicker,
  OgPill,
  OgShout,
  OgSiteUrl,
  OgTourCoverSlot,
  OgTwoLineTitle,
  OgVStack,
} from "./typography";

export const OG_VARIANTS = [
  "default",
  "newsletter",
  "redirect",
  "strawberry",
  "strawberry-tour",
  "strawberry-album",
  "admin",
] as const;

export type OgVariant = (typeof OG_VARIANTS)[number];

export function isOgVariant(value: string): value is OgVariant {
  return (OG_VARIANTS as readonly string[]).includes(value);
}

const coverUrl = () =>
  new URL("/images/strawberry-cover.jpg", OG_SITE_BASE).toString();
const tourUrl = () =>
  new URL("/images/strawberry-tour.png", OG_SITE_BASE).toString();

export function renderOgVariantElement(variant: OgVariant): ReactElement {
  const art = coverUrl();

  switch (variant) {
    case "default":
      return (
        <OgCanvas>
          <OgSplitPromoCard
            maxWidth={1120}
            height={520}
            rotate="0.8deg"
            shadowPx={12}
            left={
              <OgVStack gap={20} flex={1}>
                <OgEmojiHero emoji="🍓" fontSize={80} textShadow />
                <OgDisplayTitle fontSize={56} letterSpacing={-2}>
                  Naomi Jon HQ
                </OgDisplayTitle>
                <OgBody fontSize={22} maxWidth={420}>
                  Official hub — Strawberry Tour, newsletter & releases.
                </OgBody>
                <OgSiteUrl fontSize={20} marginTop={4}>
                  naomijonhq.com
                </OgSiteUrl>
              </OgVStack>
            }
            right={<OgFramedCover src={art} size={340} emojiSize={52} />}
          />
        </OgCanvas>
      );

    case "newsletter":
      return (
        <OgCanvas>
          <OgSplitPromoCard
            maxWidth={1000}
            height={520}
            rotate="0deg"
            shadowPx={12}
            sticker={
              <OgSticker right={48} top={36} backgroundColor={OG_COLORS.brandPink} rotate="-3deg">
                HEY!
              </OgSticker>
            }
            left={
              <OgVStack gap={16} flex={1}>
                <OgEmojiHero emoji="🍓" fontSize={88} textShadow />
                <OgTwoLineTitle line1="Naomi Jon HQ" line2="Newsletter" fontSize={44} />
                <OgBody fontSize={22} maxWidth={400}>
                  New music, tour dates, and news — straight to your inbox.
                </OgBody>
                <OgSiteUrl fontSize={18}>naomijonhq.com/newsletter</OgSiteUrl>
              </OgVStack>
            }
            right={<OgSquareThumb src={art} size={280} />}
          />
        </OgCanvas>
      );

    case "redirect":
      return (
        <OgCanvas>
          <OgStackedBrandCard
            maxWidth={920}
            height={500}
            rotate="-0.6deg"
            shadowPx={12}
            sticker={
              <OgSticker left={44} top={32} backgroundColor={OG_COLORS.brandPink} rotate="-4deg">
                SECURE LINK
              </OgSticker>
            }
            main={
              <OgVStack gap={12}>
                <OgEmojiHero emoji="🍓" fontSize={72} textShadow marginTop={8} />
                <OgDisplayTitle fontSize={48}>Naomi Jon HQ</OgDisplayTitle>
                <OgBody fontSize={26} maxWidth={640} lineHeight={1.4}>
                  Verified redirect — hang tight while we send you to the right place.
                </OgBody>
                <OgSiteUrl fontSize={20} marginTop={12}>
                  naomijonhq.com/redirect
                </OgSiteUrl>
                <OgSquareThumb
                  src={art}
                  size={200}
                  borderWidth={6}
                  borderRadius={20}
                  boxShadow={`8px 8px 0px ${OG_COLORS.brandPink}`}
                />
              </OgVStack>
            }
          />
        </OgCanvas>
      );

    case "strawberry":
      return (
        <OgCanvas>
          <OgSplitPromoCard
            maxWidth={1040}
            height={540}
            padding="48px 56px"
            rotate="1deg"
            shadowPx={10}
            sticker={<OgSticker>OUT NOW!</OgSticker>}
            left={
              <OgCoverSlot>
                <OgFramedCover src={art} size={300} emojiSize={48} />
              </OgCoverSlot>
            }
            right={
              <OgVStack gap={10} flex={1} marginTop={40}>
                <OgDisplayTitle fontSize={56} letterSpacing={-1}>
                  STRAWBERRY
                </OgDisplayTitle>
                <OgKicker letterSpacing="0.12em">{"Naomi's Sophomore Album"}</OgKicker>
                <OgPill>March 20, 2026</OgPill>
                <OgShout>{"IT'S FINALLY HERE! 🎉"}</OgShout>
                <OgSiteUrl marginTop={8}>naomijonhq.com/strawberry</OgSiteUrl>
              </OgVStack>
            }
          />
        </OgCanvas>
      );

    case "strawberry-album":
      return (
        <OgCanvas>
          <OgSplitPromoCard
            maxWidth={1040}
            height={540}
            padding="48px 56px"
            rotate="1deg"
            shadowPx={10}
            sticker={
              <OgSticker left={40} top={28} backgroundColor={OG_COLORS.brandPink} rotate="-5deg">
                STREAM
              </OgSticker>
            }
            left={
              <OgCoverSlot>
                <OgFramedCover src={art} size={300} emojiSize={48} />
              </OgCoverSlot>
            }
            right={
              <OgVStack gap={10} flex={1} marginTop={40}>
                <OgDisplayTitle fontSize={52} letterSpacing={-1}>
                  STRAWBERRY
                </OgDisplayTitle>
                <OgKicker fontSize={20} letterSpacing="0.1em">
                  Album hub
                </OgKicker>
                <OgBody fontSize={22} maxWidth={400} lineHeight={1.35}>
                  Stream & order — music video lives on /strawberry.
                </OgBody>
                <OgSiteUrl marginTop={8}>naomijonhq.com/strawberry-album</OgSiteUrl>
              </OgVStack>
            }
          />
        </OgCanvas>
      );

    case "strawberry-tour": {
      const tour = tourUrl();
      return (
        <OgCanvas>
          <OgSplitPromoCard
            maxWidth={1080}
            height={530}
            padding="40px 48px"
            rotate="0.9deg"
            shadowPx={12}
            sticker={
              <OgSticker left={36} top={28} backgroundColor={OG_COLORS.stickerOrange} rotate="-6deg">
                LIVE
              </OgSticker>
            }
            left={
              <OgTourCoverSlot>
                <OgFramedCover src={tour} size={320} showEmoji={false} />
              </OgTourCoverSlot>
            }
            right={
              <OgVStack gap={12} flex={1} marginTop={28}>
                <OgKicker letterSpacing="0.14em">On the road</OgKicker>
                <OgTwoLineTitle line1="STRAWBERRY" line2="TOUR" fontSize={52} gap={0} />
                <OgBody fontSize={22} maxWidth={380} lineHeight={1.4}>
                  Dates, cities, and tickets — all in one place.
                </OgBody>
                <OgSiteUrl>naomijonhq.com/strawberry-tour</OgSiteUrl>
              </OgVStack>
            }
          />
        </OgCanvas>
      );
    }

    case "admin":
      return (
        <OgCanvas>
          <OgStackedBrandCard
            maxWidth={880}
            height={480}
            rotate="-0.5deg"
            shadowPx={12}
            sticker={
              <OgSticker left={40} top={30} rotate="-4deg">
                STUDIO
              </OgSticker>
            }
            main={
              <OgVStack gap={16}>
                <OgGlyph emoji="✳️" fontSize={56} marginTop={16} />
                <OgDisplayTitle fontSize={44}>Sanity Studio</OgDisplayTitle>
                <OgBody fontSize={24}>Naomi Jon HQ — content admin</OgBody>
                <OgSiteUrl marginTop={16}>naomijonhq.com/admin</OgSiteUrl>
              </OgVStack>
            }
          />
        </OgCanvas>
      );

  }
}
