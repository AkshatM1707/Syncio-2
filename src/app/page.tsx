"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useStoreUserEffect } from "../storeUserEffect";
import { UserButton } from "../features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const router = useRouter();
  const {data , isLoading} =useGetWorkspaces() ;
  const workspaceId = useMemo(()=> data?.[0]?._id,[data]);
  const [open,setOpen] = useCreateWorkspaceModal() ;

  useEffect(()=>{
    if(isLoading) return ;
    if(workspaceId){
      router.replace(`/workspace/${workspaceId}`) ;
    }else if(!open){
      setOpen(true) ;
    }
  },[isLoading,workspaceId,router,open,setOpen]) ;

  return (
    <>
      <Authenticated>
        
        <Content />
      </Authenticated>

      <Unauthenticated>
        <p>Unauthenticated</p>
      </Unauthenticated>
    </>
  );
}

function Content() {
  return <div>
    <UserButton />
  </div>;
}

function RedirectToAuth({ router }: { router: ReturnType<typeof useRouter> }) {
  
  useEffect(() => {
    router.replace("/auth"); 
  }, [router]);

  return null;
}
