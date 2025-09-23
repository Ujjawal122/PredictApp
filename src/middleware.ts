import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/signup", "/login", "/dashboard"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;

  // Only allow exact public paths
  const isPublic = PUBLIC_PATHS.includes(url.pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  // Private pages: redirect if not authenticated
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ["/predict", "/dashboard/:path*"], // all /dashboard subpaths are private
};
