import LegalLayout from "@/components/LegalLayout";
import { Modal } from "@/components/ui/Modal";

export default function LegalNoticeModal() {
  return (
    <Modal>
      <LegalLayout fileName="legal-notice.md" />
    </Modal>
  );
}
