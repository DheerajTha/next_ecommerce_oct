import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoutes";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Read cookie
  const token = request.cookies.get("access_token")?.value;

  // ⛔ NO TOKEN → allow only /auth
  if (!token) {
    if (pathname.startsWith("/auth")) return NextResponse.next();
    if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    }
    return NextResponse.next();
  }

  // ✔️ TOKEN EXISTS → VERIFY
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    const role = payload?.role;

    // -------- 🟦 Auth pages should not open when logged in ----------
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD, request.url)
      );
    }

    // -------- 🟥 Protect admin area ----------
    if (pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
      }
    }

    // -------- 🟩 Protect user area ----------
    if (pathname.startsWith("/my-account")) {
      if (role !== "user") {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    // Token expired or invalid → redirect to login
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
