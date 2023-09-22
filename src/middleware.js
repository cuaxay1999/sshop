import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { NEXT_LOCALE } from "./utils/constants/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["vi", "en", "ja"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  // defaultLocale: "vi",
});

// export function middleware(request) {
//   let locale = request.cookies.get(NEXT_LOCALE)?.value || "vi";
//   return NextResponse.redirect(new URL(`/${locale}`, request.url));
// }

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
