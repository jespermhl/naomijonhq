import LegalLayout from "@/components/LegalLayout";
import { Modal } from "@/components/ui/Modal";

export default function ImprintModal() {
  return (
    <Modal>
      <LegalLayout fileName="imprint.md" />
    </Modal>
  );
}