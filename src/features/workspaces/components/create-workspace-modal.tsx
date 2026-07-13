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
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface CreateWorkspaceModalState {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

export const CreateWorkspaceModal = () =>{
  const router = useRouter(); 
  const [open,setOpen] = useCreateWorkspaceModal() ;
  const [name,setName]= useState("");
  const {mutate , isPending} = useCreateWorkspace() ;
 
  const handleClose =() => {
    setOpen(false) ;
    setName("") ;
  }

  const handleSubmit =async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({name},{
      onSuccess(id) {
        toast.success("Workspace Created");
        router.push(`/workspace/${id}`);
        handleClose();

      },

    })  
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
            <form onSubmit={handleSubmit} className="space-y-4">
             <Input 
             value={name}
             onChange= {(e)=>setName(e.target.value)}
             disabled= {isPending}
             required
             autoFocus
             minLength={3}
             placeholder="Workspace Name e.g. 'Work', 'Personal' or 'Team'"
             
             />
             <div className="flex justify-end">
                <Button disabled= {isPending}>
                    Create
                    
                </Button>

             </div>

            </form>
        </DialogContent>
    </Dialog>
  ) ;
}