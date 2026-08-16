export const siteSettings = {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'defaultTheme',
      type: 'reference',
      title: 'Default Theme',
      description:
        'Applied to all pages that do not have their own theme set.',
      to: [{type: 'theme'}],
    },
  ],
}
