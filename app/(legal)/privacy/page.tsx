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
    title: "Privacy Policy – Naomi Jon HQ",
    description: "Privacy Policy of Naomi Jon HQ",
}

export default function PrivacyPolicy() {
    const mailAdress = "info@naomijonhq.com";
    const phoneNumer = "+49 15565 829954";

    return (
        <main className="flex items-center justify-center min-h-screen px-5 py-15 bg-pattern max-sm:py-10">
            <Card maxWidth="800px" className="text-left px-10 py-15 max-sm:px-5 max-sm:py-10" rotated={false}>
                <h1 className="text-[36px] font-black mb-8 text-brand-red text-center max-sm:text-[28px]">Privacy Policy</h1>

                <Section title="">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">Last Updated: June 2, 2026</p><br />
                    <p className="text-base leading-relaxed text-text-dark font-semibold">Thank you for your interest in our website. Protecting your privacy is very important to us. Below, we provide detailed information on how we handle your data.</p>
                </Section>

                <Section title="1. Data Controller">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">The data controller in terms of the General Data Protection Regulation (GDPR) is:</p><br />
                    <p className="text-base leading-relaxed text-text-dark font-semibold">LF Digital<br />
                        Owner: Luca Hoffmann<br />
                        Münsterstraße 4<br />
                        48249 Dülmen<br />
                        Deutschland
                    </p><br />
                    <p className="text-base leading-relaxed text-text-dark font-semibold">
                        E-Mail: <a href={`mailto:${mailAdress}`} className="text-brand-red underline font-bold hover:text-brand-pink">{mailAdress}</a><br />
                        Telephone: <a href={`tel:${phoneNumer}`} className="text-brand-red underline font-bold hover:text-brand-pink">{phoneNumer}</a>
                    </p>
                </Section>

                <Section title="2. General Information and Mandatory Information">
                    <p className="text-base leading-relaxed text-text-dark font-semibold"><b>Data Protection</b><br />
                        As the operator of this website, we take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this Privacy Policy.
                    </p><br />
                    <p className="text-base leading-relaxed text-text-dark font-semibold"><b>SSL/TLS Encryption</b><br />
                        For security reasons and to protect the transmission of confidential content, such as inquiries or newsletter subscriptions you send to us, this website uses SSL or TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from &quot;http://&quot; to &quot;https://&quot; and by the lock symbol in your browser address bar.
                    </p>
                </Section>

                <Section title="3. Data Collection on Our Website">
                    <p className="text-base leading-relaxed text-text-dark font-semibold"><b>a) Hosting via Vercel</b><br />
                        We host our website at Vercel. The provider is Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.<br /><br />
                        When you visit our website, Vercel collects various data required to deliver the website stably and securely. This includes, among other things, your IP address, the date and time of access, the type of browser used, and the operating system.<br /><br />
                        The use of Vercel is based on Art. 6 (1) lit. f GDPR. We have a legitimate interest in ensuring that our website is presented as reliably, securely, and quickly as possible.<br /><br />
                        We have entered into a Data Processing Addendum (DPA) with Vercel. Since Vercel is a US-based company, data may be processed on servers in the United States. The data transfer is secured using the EU Standard Contractual Clauses (SCCs). Additionally, Vercel is certified under the EU-U.S. Data Privacy Framework.<br /><br />
                        For more information, please refer to Vercel&apos;s Privacy Policy at: <Link href="https://vercel.com/legal/privacy-policy" className="text-brand-red underline font-bold hover:text-brand-pink">https://vercel.com/legal/privacy-policy</Link><br /></p>
                </Section>

                <Section title="4. Analytics Tools">
                    <p className="text-base leading-relaxed text-text-dark font-semibold"><b>a) Vemetric Analytics</b><br />
                        To statistically evaluate visitor numbers and analyze user behavior, we use the privacy-friendly web analytics tool Vemetric on our website.<br /><br />
                        Vemetric is designed to work completely without using cookies or any local storage on your end device. No permanent identification markers are stored. IP addresses are converted into an anonymous hash value immediately upon capture and cannot be merged with other data to identify individual users. Cross-website tracking does not take place.<br /><br />
                        The data is processed on the basis of our legitimate interest in measuring reach and continuously optimizing our website in accordance with Art. 6 (1) lit. f GDPR.<br /><br /></p>
                </Section>

                <Section title="5. Newsletter">
                    <p className="text-base leading-relaxed text-text-dark font-semibold"><b>a) Klaviyo</b><br />
                        If you subscribe to our newsletter, we use the data you enter (usually your email address) to send you regular updates.<br /><br />
                        For sending and managing our newsletter, we use the service Klaviyo. The provider is Klaviyo, Inc., 125 Summer St, Floor 6, Boston, MA 02111, USA.<br /><br />
                        Registration is carried out using a &quot;double opt-in&quot; process. This means that after signing up, you will receive an email containing a confirmation link to verify that you are the actual owner of the email address.<br /><br />
                        The processing of your data is based solely on your consent pursuant to Art. 6 (1) lit. a GDPR. You can withdraw this consent at any time with effect for the future, for example by clicking the &quot;Unsubscribe&quot; link at the bottom of any newsletter or by sending an informal message to us via email.<br /><br />
                        We have entered into a Data Processing Addendum (DPA) with Klaviyo. The transfer of data to the US is secured by the EU Commission&apos;s Standard Contractual Clauses. In addition, Klaviyo, Inc. is certified under the EU-U.S. Data Privacy Framework, which guarantees an adequate level of data protection.<br /><br />
                        For more information on data protection at Klaviyo, please visit: <Link href="https://www.klaviyo.com/privacy" className="text-brand-red underline font-bold hover:text-brand-pink">https://www.klaviyo.com/privacy</Link>
                    </p>
                </Section>

                <Section title="6. Your Rights as a Data Subject">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">Under applicable legal regulations, you have the right at any time to:
                        <ul className="ml-[15px] mb-2.5">
                            <li><b>Access (Art. 15 GDPR):</b> You can request information about your personal data processed by us.</li>
                            <li><b>Rectification (Art. 16 GDPR):</b> You can request the correction of incorrect data.</li>
                            <li><b>Erasure (Art. 17 GDPR):</b> You can request the deletion of your data stored by us, provided that no statutory retention obligations prevent it.</li>
                            <li><b>Restriction of processing (Art. 18 GDPR):</b> You can request that the processing of your data be restricted.</li>
                            <li><b>Data portability (Art. 20 GDPR):</b> You have the right to receive your data in a structured, commonly used, and machine-readable format.</li>
                            <li><b>Right to lodge a complaint (Art. 77 GDPR):</b> You have the right to lodge a complaint with a competent data protection supervisory authority regarding our processing of your data.</li>
                        </ul>
                        For these matters, or if you have any other questions regarding data protection, you can contact us at any time using the address provided in the imprint or in this policy.</p>
                </Section>

                <Section title="7. Right to Object (Art. 21 GDPR)">
                    <p className="text-base leading-relaxed text-text-dark font-semibold">If your personal data is processed based on legitimate interests pursuant to Art. 6 (1) sentence 1 lit. f GDPR, you have the right, pursuant to Art. 21 GDPR, to object to the processing of your personal data, provided that there are reasons arising from your particular situation.<br /><br />
                        If you wish to make use of your right to object, an email is sufficient: <Link href={`mailto:${mailAdress}`} className="text-brand-red underline font-bold hover:text-brand-pink">{mailAdress}</Link></p>
                </Section>
            </Card>
        </main>
    );
}