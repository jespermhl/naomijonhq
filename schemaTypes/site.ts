import {type Rule} from 'sanity'

const required = (Rule: Rule) => Rule.required()

const link = {
  type: 'object',
  name: 'link',
  title: 'Link',
  fields: [
    {name: 'label', type: 'string', title: 'Label', validation: required},
    {name: 'href', type: 'url', title: 'URL', validation: required},
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

const stat = {
  type: 'object',
  name: 'stat',
  title: 'Stat',
  fields: [
    {name: 'label', type: 'string', title: 'Label', validation: required},
    {name: 'value', type: 'string', title: 'Value', validation: required},
  ],
  preview: {select: {title: 'label', subtitle: 'value'}},
}

const sections = [
  {
    type: 'object',
    name: 'hero',
    title: 'Hero',
    fields: [
      {name: 'eyebrow', type: 'string', title: 'Eyebrow'},
      {name: 'title', type: 'string', title: 'Title', validation: required},
      {name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2},
      {name: 'bullets', type: 'array', title: 'Bullet Points', of: [{type: 'string'}]},
      {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
      {name: 'imageAlt', type: 'string', title: 'Image Alt Text'},
      {
        name: 'showDiscordStats',
        type: 'boolean',
        title: 'Show Discord Live Stats',
        description: 'Overlays online/member counts on the image.',
      },
      {name: 'buttonLabel', type: 'string', title: 'Button Label'},
      {name: 'buttonHref', type: 'url', title: 'Button URL'},
    ],
    preview: {select: {title: 'title', subtitle: 'eyebrow'}},
  },
  {
    type: 'object',
    name: 'richText',
    title: 'Rich Text',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'body', type: 'text', title: 'Body', rows: 6},
    ],
    preview: {select: {title: 'heading'}},
  },
  {
    type: 'object',
    name: 'imageBlock',
    title: 'Image',
    fields: [
      {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
      {name: 'alt', type: 'string', title: 'Alt Text'},
      {name: 'caption', type: 'string', title: 'Caption'},
    ],
    preview: {select: {title: 'caption'}},
  },
  {
    type: 'object',
    name: 'links',
    title: 'Links',
    fields: [
      {name: 'title', type: 'string', title: 'Title'},
      {name: 'links', type: 'array', title: 'Links', of: [link]},
    ],
    preview: {select: {title: 'title'}},
  },
  {
    type: 'object',
    name: 'socials',
    title: 'Socials',
    fields: [
      {name: 'eyebrow', type: 'string', title: 'Eyebrow'},
      {name: 'title', type: 'string', title: 'Title'},
    ],
    preview: {title: 'Socials'},
  },
  {
    type: 'object',
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      {name: 'eyebrow', type: 'string', title: 'Eyebrow'},
      {name: 'title', type: 'string', title: 'Title'},
      {name: 'description', type: 'text', title: 'Description', rows: 2},
    ],
    preview: {title: 'Newsletter'},
  },
  {
    type: 'object',
    name: 'cta',
    title: 'Call to Action',
    fields: [
      {name: 'title', type: 'string', title: 'Title', validation: required},
      {name: 'description', type: 'text', title: 'Description', rows: 2},
      {name: 'buttonLabel', type: 'string', title: 'Button Label', validation: required},
      {name: 'buttonHref', type: 'url', title: 'Button URL', validation: required},
    ],
    preview: {select: {title: 'title'}},
  },
  {
    type: 'object',
    name: 'stats',
    title: 'Stats',
    fields: [
      {name: 'title', type: 'string', title: 'Title'},
      {name: 'stats', type: 'array', title: 'Stats', of: [stat]},
    ],
    preview: {select: {title: 'title'}},
  },
  {
    type: 'object',
    name: 'tourList',
    title: 'Tour Dates',
    fields: [{name: 'title', type: 'string', title: 'Title'}],
    preview: {select: {title: 'title'}},
  },
  {
    type: 'object',
    name: 'perfumeGrid',
    title: 'Perfume Grid',
    fields: [{name: 'title', type: 'string', title: 'Title'}],
    preview: {select: {title: 'title'}},
  },
]

export const site = {
  name: 'site',
  type: 'document',
  title: 'Sites',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: required,
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug (URL path, e.g. "merch")',
      description:
        'The page lives at /<slug>. Leave empty for the homepage.',
      options: {source: 'name', maxLength: 60},
    },
    {
      name: 'theme',
      type: 'reference',
      title: 'Theme Override',
      description: 'Overrides siteSettings.defaultTheme for this page.',
      to: [{type: 'theme'}],
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: sections,
    },
  ],
}
