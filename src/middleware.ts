import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  //console.log("REQESTPATH", request.nextUrl.pathname);
  const jwt = request.cookies.get("myTokenName");
  //console.log("JWT", jwt);
  //if (!jwt) return NextResponse.redirect(new URL("/login", request.url));
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  //ya hay token y a a verificar
  /*try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    console.log("ERROR");*/
  return NextResponse.next();
  //return NextResponse.redirect(new URL("/login", request.url));
  //}
}

export const config = {
  matcher: ["/animals/admin:path*"],
};
