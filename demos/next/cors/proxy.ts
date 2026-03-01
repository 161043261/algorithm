import { NextRequest, NextResponse, ProxyConfig } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([k, v]) => {
    response.headers.set(k, v);
  });
  return response;
}

export const config: ProxyConfig = {
  matcher: "/api/:path*",
};
