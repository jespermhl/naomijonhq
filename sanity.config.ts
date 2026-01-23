import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Naomi Jon HQ Admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'redirect',
        type: 'document',
        title: 'Redirects',
        fields: [
          { name: 'source', type: 'string', title: 'Pfad (z.B. /tour)' },
          { name: 'destination', type: 'string', title: 'Ziel-URL' },
          { name: 'permanent', type: 'boolean', title: '301 Permanent?', initialValue: true },
          { name: 'noRedirect', type: 'boolean', title: 'Nicht weiterleiten? (Seite wird lokal gerendert)', initialValue: false },
        ],
      },
      {
        name: 'social',
        type: 'document',
        title: 'Socials',
        fields: [
          { name: 'name', type: 'string', title: 'Name (z.B. Instagram)' },
          { name: 'url', type: 'string', title: 'URL' },
          {
            name: 'platform',
            type: 'string',
            title: 'Platform',
            options: {
              list: [
                { title: 'Instagram', value: 'instagram' },
                { title: 'TikTok', value: 'tiktok' },
                { title: 'YouTube', value: 'youtube' },
                { title: 'Spotify', value: 'spotify' },
                { title: 'Discord', value: 'discord' },
                { title: 'WhatsApp', value: 'whatsapp' },
                { title: 'Other', value: 'other' },
              ],
            },
          },
          { name: 'order', type: 'number', title: 'Order', initialValue: 0 },
        ],
      },
    ],
  },
});