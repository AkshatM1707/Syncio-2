"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog" ;
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateWorkspaceModalState {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

export const CreateWorkspaceModal = () =>{
  const [open,setOpen] = useCreateWorkspaceModal() ;
  const handleClose =() => {
    setOpen(false) ;
    //TODO: clear Form
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>
                    Create a new workspace to collaborate with your team.
                </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
             <Input 
             value=""
             disabled= {false}
             required
             autoFocus
             minLength={3}
             placeholder="Workspace Name e.g. 'Work', 'Personal' or 'Team'"
             
             />
             <div className="flex justify-end">
                <Button disabled= {false}>
                    Create
                    
                </Button>

             </div>

            </form>
        </DialogContent>
    </Dialog>
  ) ;
}