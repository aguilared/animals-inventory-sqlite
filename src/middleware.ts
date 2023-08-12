import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  //console.log("REQEST", request);
  //console.log("REQESTCookie", request.cookies);
  console.log("REQESTPATH", request.nextUrl.pathname);

  const jwt = request.cookies.get("myTokenName");
  console.log("JWT", jwt);
  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /*if (
    request.nextUrl.pathname.startsWith("/animals/admin") &&
    jwt === undefined
  ) {
    const response = NextResponse.redirect(new URL("/animals", request.url));
    response.cookies.delete("jwt");
    return response;
  }
  if (request.nextUrl.pathname.startsWith("/login") && jwt === undefined) {
    console.log("REQESTPATHLOGIN", request.nextUrl.pathname);

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("jwt");
    return response;
  }
  */
  //ya hay token y a a verificar
  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("secret")
    );
    //console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    console.log("ERROR");
    //return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/animals/admin:path*"],
};
