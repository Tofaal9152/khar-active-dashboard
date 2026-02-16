import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/session";

export async function proxy(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  // ❌ Not logged in go ot login page
  if (!session && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // ✅ Logged in → prevent access to auth pages
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
