import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  console.log("REQESTPATH", request.nextUrl.pathname);
  const jwt = request.cookies.get("myTokenName");
  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  console.log("JWT", jwt);

  return NextResponse.next();
}

export const config = {
  matcher: ["/login3/:path*", "/animals/admin:path*"],
};
