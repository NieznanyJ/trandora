import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const refreshToken = cookies.get("refreshToken");

  // Define the protected path
  const protectedPath = '/profile';

  // Check if the current path is the protected path
  const isProtectedPath = request.nextUrl.pathname.startsWith(protectedPath);

  if (isProtectedPath && !refreshToken) {
    // If it's the profile page and there's no refresh token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For all other paths, or if the user has a refresh token
  if (refreshToken) {
    // If there's a refresh token, we don't need to generate a new one
    return NextResponse.next();
  }

  // If there's no refresh token and it's not the profile page, generate a visitor token
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();
  const response = NextResponse.next();
  response.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return response;
};

// Add a matcher to specify which routes this middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};