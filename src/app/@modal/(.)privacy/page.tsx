import LegalLayout from "@/src/components/LegalLayout";
import { Modal } from "@/src/components/ui/Modal";

export default function PrivacyModal() {
  return (
    <Modal>
      <LegalLayout fileName="privacy.md" showCardLayout={false} />
    </Modal>
  );
}
