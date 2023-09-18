import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
  let locale = request.cookies.get("sspa-locale")?.value || "vi";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: "/",
};
