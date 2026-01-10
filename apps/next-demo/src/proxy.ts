import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("[proxy] url:", request.url);
  const { pathname } = request.nextUrl;
  console.log("[proxy] pathname:", pathname);
  if (pathname.startsWith("/home")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api")) {
    const cookie = request.cookies.get("token");
    if (pathname === "/api/login" || cookie) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config: ProxyConfig = {
  // matcher: '/home/:path*'
  // matcher: ["/home/:path*", "/api/:path*"],

  matcher: [
    "/home/:path*",
    {
      source: "/api/login",
      has: [
        {
          type: "header",
          key: "Content-Type",
          value: "application/json",
        },
      ],
    },
    {
      source: "/api/user",
      has: [
        {
          type: "cookie",
          key: "token",
          value: "161043261",
        },
        {
          type: "query",
          key: "username",
          value: "lark",
        },
      ],
      missing: [
        {
          type: "query",
          key: "username",
          value: "admin",
        },
      ],
    },
  ],
};
