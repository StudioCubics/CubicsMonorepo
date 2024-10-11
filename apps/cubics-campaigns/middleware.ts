import { auth } from "@/auth";

const publicPages = ["/auth/login", "/auth/register", "/"];

export default auth((req) => {
  // Deny access to unauthorised users if they visit any page other than publicPages
  if (!req.auth && !publicPages.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    console.log("Middleware blocked protected pages!!!");
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export { auth as middleware } from "@/auth"
