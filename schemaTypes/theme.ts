import type {Rule} from 'sanity'

const GROUPS = {
  backgrounds: 'Backgrounds',
  brand: 'Brand',
  surfaces: 'Surfaces',
  text: 'Text',
  borders: 'Borders',
  extras: 'Extras',
}

const color = (name: string, title: string, group: string) => ({
  name,
  type: 'string' as const,
  title,
  group,
  validation: (Rule: Rule) =>
    Rule.custom((value: string) => {
      if (!value) return true
      const hex = /^#[0-9a-fA-F]{3,8}$/
      const rgb = /^rgba?\([\d\s,./%]+\)$/
      return hex.test(value.trim()) || rgb.test(value.trim())
        ? true
        : 'Use a hex color (e.g. #ff4fa8) or rgba() value.'
    }),
})

export const theme = {
  name: 'theme',
  type: 'document',
  title: 'Themes',
  groups: Object.values(GROUPS).map((title) => ({name: title, title})),
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used as the data-theme attribute value (e.g. "villain").',
      options: {source: 'name', maxLength: 40},
      validation: (Rule: Rule) => Rule.required(),
    },
    ...Object.entries({
      bgBase1: 'Base Background 1 (body gradient top)',
      bgBase2: 'Base Background 2 (body gradient middle)',
      bgBase3: 'Base Background 3 (body gradient bottom)',
      bgGlowA: 'Glow A (radial, top-left)',
      bgGlowB: 'Glow B (radial, top-right)',
    }).map(([name, title]) => color(name, title, GROUPS.backgrounds)),
    ...Object.entries({
      brandRed: 'Brand Red (accent / links / selection)',
      brandRedDark: 'Brand Red Dark (hover)',
      brandBtn: 'Button Background',
      brandPink: 'Brand Pink (soft accents)',
      brandPinkDeep: 'Brand Pink Deep',
      brandPinkMid: 'Brand Pink Mid',
      onBrand: 'On-Brand Text (text on brand buttons)',
    }).map(([name, title]) => color(name, title, GROUPS.brand)),
    ...Object.entries({
      bgPrimary: 'Primary Background',
      bgSurface: 'Surface Background (cards)',
      bgGlass: 'Glass Background',
      bgGlassStrong: 'Glass Strong Background',
      bgGlassSoft: 'Glass Soft Background',
      bgPinkTint: 'Pink Tint Background',
      bgFooter: 'Footer Background',
    }).map(([name, title]) => color(name, title, GROUPS.surfaces)),
    ...Object.entries({
      textDark: 'Text Dark (primary text)',
      textMuted: 'Text Muted (secondary text)',
      textFaint: 'Text Faint (placeholder text)',
      onTextDark: 'On-Dark Text',
    }).map(([name, title]) => color(name, title, GROUPS.text)),
    ...Object.entries({
      borderGlass: 'Border Glass',
      borderGlassSoft: 'Border Glass Soft',
      borderPink: 'Border Pink',
      borderSubtle: 'Border Subtle',
    }).map(([name, title]) => color(name, title, GROUPS.borders)),
    ...Object.entries({
      dropBrandStrong: 'Drop Shadow Brand Strong',
      dropBrandSoft: 'Drop Shadow Brand Soft',
      themeColor: 'Theme Color (browser bar)',
    }).map(([name, title]) => color(name, title, GROUPS.extras)),
  ],
}
