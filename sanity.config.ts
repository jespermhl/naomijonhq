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
          {
            name: 'clickCount',
            type: 'number',
            title: 'Klicks',
            description: 'Anzahl der Redirects (automatisch aktualisiert)',
            initialValue: 0,
            readOnly: true,
          },
          {
            name: 'lastClicked',
            type: 'datetime',
            title: 'Letzter Klick',
            description: 'Zeitpunkt des letzten Redirects',
            readOnly: true,
          },
        ],
        preview: {
          select: {
            source: 'source',
            destination: 'destination',
            clicks: 'clickCount',
            lastClick: 'lastClicked',
          },
          prepare({ source, destination, clicks, lastClick }: any) {
            const clicksText = clicks ? `${clicks} Klicks` : '0 Klicks';
            const dateText = lastClick 
              ? new Date(lastClick).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
              : 'Nie';
            return {
              title: `${source} → ${destination}`,
              subtitle: `${clicksText} • Letzter: ${dateText}`,
            };
          },
        },
      },
    ],
  },
});