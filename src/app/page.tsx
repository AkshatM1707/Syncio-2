"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>

      <Unauthenticated>
        <p>Unauthenticated</p>
      </Unauthenticated>
    </>
  );
}

function Content() {
  return <div>Authenticated content</div>;
}

function RedirectToAuth({ router }: { router: ReturnType<typeof useRouter> }) {
  console.log('djkfhbskjdfbgkdsjbgsdkj');
  useEffect(() => {
    router.replace("/auth"); 
  }, [router]);

  return null;
}
