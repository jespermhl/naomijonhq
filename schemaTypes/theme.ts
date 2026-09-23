import type {Rule} from 'sanity'

const color = (name: string, title: string, opts?: {required?: boolean; group?: string}) => ({
  name,
  type: 'string' as const,
  title,
  group: opts?.group,
  validation: (Rule: Rule) => {
    const r = Rule.custom((value: string) => {
      if (!value) return true
      const hex = /^#[0-9a-fA-F]{3,8}$/
      const rgb = /^rgba?\([\d\s,./%]+\)$/
      return hex.test(value.trim()) || rgb.test(value.trim())
        ? true
        : 'Use a hex color (e.g. #ff4fa8) or rgba() value.'
    })
    return opts?.required ? r.required() : r
  },
})

export const theme = {
  name: 'theme',
  type: 'document',
  title: 'Themes',
  groups: [
    {name: 'seeds', title: 'Seed Colors'},
    {name: 'overrides', title: 'Overrides'},
  ],
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
    {
      name: 'brand',
      type: 'string',
      title: 'Brand',
      description: 'Main accent color used for links, buttons, highlights.',
      group: 'seeds',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'bg',
      type: 'string',
      title: 'Background',
      description: 'Base background color (body, page).',
      group: 'seeds',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'surface',
      type: 'string',
      title: 'Surface',
      description: 'Card and panel background color.',
      group: 'seeds',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'accent',
      type: 'string',
      title: 'Accent',
      description: 'Secondary/deep accent for hover states and highlights.',
      group: 'seeds',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'muted',
      type: 'string',
      title: 'Muted',
      description: 'Muted variant for buttons and borders.',
      group: 'seeds',
      validation: (Rule: Rule) => Rule.required(),
    },
    ...Object.entries({
      brandBtn: 'Button Background',
      onBrand: 'On-Brand Text',
      onTextDark: 'On-Dark Text',
      bgGlowA: 'Glow A',
      bgGlowB: 'Glow B',
      themeColor: 'Theme Color (browser bar)',
    }).map(([name, title]) => color(name, title, {group: 'overrides'})),
  ],
}
