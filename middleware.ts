import { 
  clerkMiddleware, 
  createRouteMatcher,
  ClerkMiddlewareAuth,
  ClerkMiddlewareOptions } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from 'next/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/teacher/(.*)",
  "/courses/(.*)",
  "/dashboard/(.*)"
]);

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",  // Root route should be public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
  "/api/uploadthing(.*)"
]);

// Define the middleware handler with proper types
const middleware = async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
  const { userId } = await auth.protect(); // Using protect() to get the auth state
  const isPublic = isPublicRoute(request);
  const isProtected = isProtectedRoute(request);

  // Allow public routes without redirection
  if (isPublic) {
    return NextResponse.next();
  }

  // Protect specified routes
  if (isProtected) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // For all other routes, proceed normally
  return NextResponse.next();
};

export default clerkMiddleware(middleware);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'
  ]
};
 
