import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Credits } from "@/components/ui/Credits";
import styles from "./newsletter.module.css";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Join Naomi Jon's newsletter for the latest updates, exclusive content, and more!",
};

/**
 * The Newsletter page component.
 * Displays a custom newsletter signup form.
 */
export default function NewsletterPage() {
  return (
    <main className={`${styles.newsletterPage} bg-pattern`}>
      <Card className={styles.newsletterCard} maxWidth="460px">
        <Sticker rotate="-3deg">
          HEY!
        </Sticker>

        <div className="strawberry-emoji wobble" style={{ fontSize: "92px" }}>
          🍓
        </div>

        <h1 className="page-title">
          Naomi Jon HQ
          <br />
          Newsletter
        </h1>

        <p className="page-subtitle">
          Stay updated with new music, concert dates, and news from Naomi Jon.
        </p>

        <NewsletterForm />

        <Credits />
      </Card>
    </main>
  );
}
