import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { defaultLocale, locales } from "./i18n";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

export async function proxy(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  if (locales.some((locale) => req.nextUrl.pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }
  const headers = {
    "accept-language": req.headers.get("accept-language") ?? "",
  };
  const negotiator = new Negotiator({ headers });
  const langs = negotiator.languages();
  const lang = match(langs, locales, defaultLocale);
  const { pathname } = req.nextUrl;
  req.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config: ProxyConfig = {
  // (?!) 匹配的路径不包含 api, _next/static, _next/image, favicon.ico
  // .* 匹配任意字符 0 次, 1 次或多次
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
