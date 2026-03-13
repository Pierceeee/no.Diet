import { intlayerMiddleware } from "next-intlayer/middleware";
import { NextResponse, type NextRequest } from "next/server";

const LOCALE_PREFIXES = new Set([
  "en",
  "lt",
  "zh-Hant",
  "cs",
  "lv",
  "he",
  "ru",
  "hu",
  "el",
  "hr",
  "da",
  "sk",
  "ro",
  "ja",
]);

export function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0];

  // Prevent redirect loops: let already-localized URLs pass through untouched.
  if (firstSegment && LOCALE_PREFIXES.has(firstSegment)) {
    return NextResponse.next();
  }

  return intlayerMiddleware(request);
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
