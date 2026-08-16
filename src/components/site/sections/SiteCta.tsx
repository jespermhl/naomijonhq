import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SiteSection } from "@/lib/sanity/sites";

export function SiteCta({ section }: { section: SiteSection }) {
  if (section._type !== "cta") return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Card
          rotated={false}
          className="flex w-full flex-col items-center p-8 text-center sm:p-12"
        >
          <h2 className="text-text-dark text-display-md leading-[1.1] font-black tracking-tight uppercase">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-text-muted mt-4 max-w-lg text-body-lg leading-relaxed font-semibold">
              {section.description}
            </p>
          )}
          <Button
            href={section.buttonHref}
            rotate="0deg"
            size="large"
            className="mt-8"
          >
            {section.buttonLabel}
          </Button>
        </Card>
      </div>
    </section>
  );
}
