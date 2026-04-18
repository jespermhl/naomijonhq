import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Join Naomi Jon's newsletter for the latest updates, exclusive content, and more!",
};

/**
 * The Newsletter page component.
 * Displays a custom newsletter signup form.
 */
export default async function NewsletterPage() {
  return (
    <main
      className="concerts-container bg-pattern"
      style={{ justifyContent: "center", padding: "24px" }}
    >
      <Card className="newsletter-card">
        <Sticker className="hey-sticker" rotate="-3deg">HEY!</Sticker>

        <div className="strawberry-emoji wobble" style={{ fontSize: "92px" }}>
          🍓
        </div>

        <h1 className="newsletter-title">
          Naomi Jon HQ
          <br />
          Newsletter
        </h1>

        <p className="newsletter-p">
          Stay updated with new music, concert dates, and news from Naomi Jon.
        </p>

        <NewsletterForm />
      </Card>
    </main>
  );
}