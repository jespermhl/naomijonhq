import LegalLayout from "@/src/components/LegalLayout";
import { Modal } from "@/src/components/ui/Modal";

export default function LegalNoticeModal() {
  return (
    <Modal>
      <LegalLayout fileName="legal-notice.md" showCardLayout={false} />
    </Modal>
  );
}
