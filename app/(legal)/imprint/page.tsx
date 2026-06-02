import Link from "next/link";
import { Card } from "@/components/ui/Card";
import styles from "./imprint.module.css";
import { Metadata } from "next";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
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
        <main className={`${styles.imprintMain} bg-pattern`}>
            <Card maxWidth="800px" className={styles.imprintCard} rotated={false}>
                <h1 className={styles.title}>Imprint</h1>

                <Section title="Service Provider">
                    <address className={styles.address}>
                        <p className={styles.text}>
                            LF Digital<br />
                            Owner: Luca Hoffmann<br />
                            Münsterstraße 4<br />
                            48249 Dülmen<br />
                            Deutschland
                        </p>
                    </address>
                </Section>

                <Section title="Contact">
                    <p className={styles.text}>
                        E-Mail: <a href={`mailto:${mailAdress}`} className={styles.link}>{mailAdress}</a><br />
                        Telephone: <a href={`tel:${phoneNumer}`} className={styles.link}>{phoneNumer}</a>
                    </p>
                </Section>

                <Section title="Person responsible for content pursuant to Section 18(2) of the German State Media Treaty (MStV)">
                    <p className={styles.text}>
                        Luca Hoffmann<br />
                        Münsterstraße 4<br />
                        48249 Dülmen<br />
                        Deutschland
                    </p>
                </Section>

                <Section title="Consumer Dispute Resolution pursuant to Section 36 of the VSBG">
                    <p className={styles.text}>
                        We do not participate in dispute resolution proceedings before a consumer arbitration board.
                    </p>
                </Section>

                <Section title="Disclaimer">
                    <p className={styles.text}>
                        We are responsible for the content of our website in accordance with applicable laws. All content is created with due care and to the best of our knowledge. To the extent that we provide hyperlinks to third-party websites on our website, we cannot guarantee that the linked content remains up-to-date, accurate, or complete, as this content lies outside our area of responsibility and we have no influence over its future design. If, in your opinion, any content violates applicable law or is inappropriate, please notify us. <br /><br />
                        The legal notices on this page, as well as all questions and disputes related to the design of this website, are subject to the laws of the Federal Republic of Germany.
                    </p>
                </Section>

                <Section title="Privacy Notice">
                    <p className={styles.text}>
                        You can find our privacy policy at: <Link href="/privacy" className={styles.link}>naomijonhq.com/privacy</Link>
                    </p>
                </Section>

                <Section title="Copyright Notice">
                    <p className={styles.text}>
                        The text, images, photos, videos, and graphics available on our website are generally protected by copyright. Any unauthorized use (in particular the reproduction, modification, or distribution) of this copyrighted content is therefore prohibited. If you intend to use this content or parts thereof, please contact us in advance using the contact information provided above. If we do not ourselves hold the necessary copyrights, we will endeavor to facilitate contact with the rights holder.
                    </p>
                </Section>

                <Section title="Reservation of rights regarding the use of text and data mining">
                    <p className={styles.text}>
                        The owner of this website permits third parties to use or download content from this website for the development, training, or operation of artificial intelligence or other machine learning systems (“text and data mining”) only with the owner’s express written consent. Without such consent, it is prohibited to use the content for text and data mining. This applies even if the website does not contain any metadata that blocks such processes, and even if bots designed to crawl the website for the purposes of text and data mining are not blocked.
                    </p>
                </Section>
            </Card>
        </main>
    );
}