import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import AddForm from "./AddForm";

function EditModal({ openModal, onOpenChange, data = null, onUpdateSuccess }) {
  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <AddForm data={data} onUpdateSuccess={onUpdateSuccess} modalOpenChange={onOpenChange}/>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
