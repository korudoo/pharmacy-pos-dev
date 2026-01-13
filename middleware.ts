import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const middleware = withAuth(
  function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token
    console.log("Middleware token:", token)

    // Role-based protection for admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }

    // Role-based protection for cashier routes
    if (request.nextUrl.pathname.startsWith("/cashier")) {
      if (token?.role !== "cashier") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }

    // Role-based protection for dashboard (admin only)
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow unauthenticated access to sign-in page
        if (req.nextUrl.pathname === "/") {
          return true
        }
        // For protected routes, require a valid token
        return !!token
      },
    },
    pages: {
      signIn: "/",
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/cashier/:path*"],
}