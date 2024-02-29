import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

function DeleteConfirm({ openDialog, onOpenChange, confimDelete }) {
  return (
    <>
      <Dialog open={openDialog} onOpenChange={onOpenChange}>
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone.
            </DialogDescription>
            <div className="flex justify-center pt-3">
                <Button onClick={()=>{confimDelete(); onOpenChange()}}>Delete</Button>
                {/* <Button>Cancel</Button> */}
            </div>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteConfirm;
