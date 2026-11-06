import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Swami Jap Admin Proxy (Next.js 16+ file convention: proxy.ts)
 *
 * Protects all /admin routes (except /admin/login).
 * Reads the next-auth session token from cookies — compatible with
 * NextAuth v4 JWT strategy (no edge-incompatible DB calls required).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";

  // NextAuth v4 sets the token in __Secure-next-auth.session-token (HTTPS)
  // or next-auth.session-token (HTTP / dev). Check both.
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // If already logged in and hitting /admin/login → redirect to dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If not logged in and hitting any other /admin/* page → redirect to login
  if (!isLoginPage && !isAuthenticated) {
    const from = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(
      new URL(`/admin/login?from=${from}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
