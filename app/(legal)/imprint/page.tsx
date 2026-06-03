import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Metadata } from "next";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <section className="mb-7">
            <h2 className="text-xl font-black text-brand-red mb-2">{title}</h2>
            {children}
        </section>
    );
}

export const metadata: Metadata = {
    title: "Imprint – Naomi Jon HQ",
    description: "Legal Notice and Imprint of Naomi Jo HQ",
}

export default function Imprint() {
    const mailAdress = "info@naomijonhq.com";
    const phoneNumer = "+49 15565 829954";

    return (
        <main className="flex items-center justify-center min-h-screen px-5 py-15 bg-pattern max-sm:py-10">
            <Card maxWidth="800px" className="text-left px-10 py-15 max-sm:px-5 max-sm:py-10" rotated={false}>
                <h1 className="text-[36px] font-black mb-8 text-brand-red text-center max-sm:text-[28px]">Imprint</h1>

                <Section title="Service Provider">
                    <address className="not-italic">
                        <p className="text-base leading-relaxed text-text-dark font-semibold">
                            LF Digital<br />
                            Owner: Luca Hoffmann<br />
                            Münsterstraße 4<br />
                            48249 Dülmen<br />
                            Deutschland
                        </p>
                    </address>
                </Section>

                <Section title="Contact">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        E-Mail: <a href={`mailto:${mailAdress}`} className="text-brand-red underline font-bold hover:text-brand-pink">{mailAdress}</a><br />
                        Telephone: <a href={`tel:${phoneNumer}`} className="text-brand-red underline font-bold hover:text-brand-pink">{phoneNumer}</a>
                    </p>
                </Section>

                <Section title="Person responsible for content pursuant to Section 18(2) of the German State Media Treaty (MStV)">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        Luca Hoffmann<br />
                        Münsterstraße 4<br />
                        48249 Dülmen<br />
                        Deutschland
                    </p>
                </Section>

                <Section title="Consumer Dispute Resolution pursuant to Section 36 of the VSBG">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        We do not participate in dispute resolution proceedings before a consumer arbitration board.
                    </p>
                </Section>

                <Section title="Disclaimer">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        We are responsible for the content of our website in accordance with applicable laws. All content is created with due care and to the best of our knowledge. To the extent that we provide hyperlinks to third-party websites on our website, we cannot guarantee that the linked content remains up-to-date, accurate, or complete, as this content lies outside our area of responsibility and we have no influence over its future design. If, in your opinion, any content violates applicable law or is inappropriate, please notify us. <br /><br />
                        The legal notices on this page, as well as all questions and disputes related to the design of this website, are subject to the laws of the Federal Republic of Germany.
                    </p>
                </Section>

                <Section title="Privacy Notice">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        You can find our privacy policy at: <Link href="/privacy" className="text-brand-red underline font-bold hover:text-brand-pink">naomijonhq.com/privacy</Link>
                    </p>
                </Section>

                <Section title="Copyright Notice">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        The text, images, photos, videos, and graphics available on our website are generally protected by copyright. Any unauthorized use (in particular the reproduction, modification, or distribution) of this copyrighted content is therefore prohibited. If you intend to use this content or parts thereof, please contact us in advance using the contact information provided above. If we do not ourselves hold the necessary copyrights, we will endeavor to facilitate contact with the rights holder.
                    </p>
                </Section>

                <Section title="Reservation of rights regarding the use of text and data mining">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        The owner of this website permits third parties to use or download content from this website for the development, training, or operation of artificial intelligence or other machine learning systems (&quot;text and data mining&quot;) only with the owner&apos;s express written consent. Without such consent, it is prohibited to use the content for text and data mining. This applies even if the website does not contain any metadata that blocks such processes, and even if bots designed to crawl the website for the purposes of text and data mining are not blocked.
                    </p>
                </Section>
            </Card>
        </main>
    );
}
