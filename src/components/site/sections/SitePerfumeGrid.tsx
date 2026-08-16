import PerfumeCard from "@/app/perfumes/_components/PerfumeCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPerfumes } from "@/lib/sanity/perfumes";
import type { SiteSection } from "@/lib/sanity/sites";

export async function SitePerfumeGrid({ section }: { section: SiteSection }) {
  if (section._type !== "perfumeGrid") return null;

  const perfumes = await getPerfumes();
  if (perfumes.length === 0) return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-275">
        <div className="text-center">
          <SectionHeading
            eyebrow="Shop"
            title={section.title || "Perfumes"}
          />
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume._id} perfume={perfume} />
          ))}
        </div>
      </div>
    </section>
  );
}
