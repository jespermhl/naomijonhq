import LegalLayout from "@/components/LegalLayout";
import { Modal } from "@/components/ui/Modal";

export default function PrivacyPolicyModal() {
  return (
    <Modal>
      <LegalLayout fileName="privacy-policy.md" showCardLayout={false} />
    </Modal>
  );
}
