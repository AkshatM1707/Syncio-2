"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStoreUserEffect } from "../storeUserEffect";
import { UserButton } from "../features/auth/components/user-button";

export default function Home() {
  const router = useRouter();

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
