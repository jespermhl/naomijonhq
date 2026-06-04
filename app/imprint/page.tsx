import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
    title: "Imprint – Naomi Jon HQ",
    description: "Legal Notice and Imprint of Naomi Jon HQ",
};

export default function Imprint() {
    return <LegalLayout fileName="imprint.md" />;
}