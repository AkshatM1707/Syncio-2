import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { AUTH_ROUTES , PUBLIC_ROUTES } from "./app/constants/routes";
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if(PUBLIC_ROUTES.includes(req.nextUrl.pathname)){
    return NextResponse.next();
  }
  if(AUTH_ROUTES.includes(req.nextUrl.pathname)){
    if(userId){
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
});

export const config = { 
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};