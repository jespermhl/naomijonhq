import { NewsletterForm } from "@/components/NewsletterForm";

export default function NewsletterSection() {
    return (
        <section className="relative w-full border-t border-white/20 px-6 py-20 max-sm:px-4 max-sm:py-14">
            <div className="mx-auto max-w-2xl text-center">
                <span className="text-brand-red mb-3 inline-block text-xs font-black uppercase tracking-[0.3em]">
                    Keep your eyes peeled
                </span>

                <h2 className="text-[#1f171d] mb-4 text-[clamp(2rem,4vw,3.2rem)] font-black uppercase leading-[1.05] tracking-tighter">
                    Newsletter
                </h2>

                <p className="text-[#5f4e58]/90 mx-auto mb-8 max-w-lg text-[clamp(0.95rem,1.1vw,1.1rem)] font-semibold leading-relaxed">
                    Stay updated with new music, concert dates,
                    <br />
                    and exclusive news from Naomi Jon.
                </p>

                <div className="mx-auto w-full max-w-md">
                    <NewsletterForm />
                </div>
            </div>
        </section>
    )
} 