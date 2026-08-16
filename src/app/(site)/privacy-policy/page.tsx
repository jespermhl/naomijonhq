import { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy – Naomi Jon HQ",
  description: "Privacy Policy of Naomi Jon HQ",
};

export default function PrivacyPolicy() {
  return <LegalLayout fileName="privacy-policy.md" />;
}
