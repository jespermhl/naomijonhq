import { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Legal Notice – Naomi Jon HQ",
  description: "Legal Notice and Imprint of Naomi Jon HQ",
};

export default function LegalNotice() {
  return <LegalLayout fileName="legal-notice.md" />;
}
