import LegalLayout from "@/components/LegalLayout";
import { Modal } from "@/components/ui/Modal";

export default function PrivacyModal() {
  return (
    <Modal>
      <LegalLayout fileName="privacy.md" />
    </Modal>
  );
}
