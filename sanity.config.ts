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
    ],
  },
});