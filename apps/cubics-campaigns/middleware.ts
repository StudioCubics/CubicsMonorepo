import { auth } from "@/auth";

const authPages = ["/auth/login", "/auth/register"];

const publicPages = [...authPages, "/"];

export default auth((req) => {
  // Deny access to unauthorised users if they visit any page other than publicPages
  if (!req.auth && !publicPages.includes(req.nextUrl.pathname)) {
    console.log("Middleware blocked protected pages!");
    return Response.redirect(new URL("/auth/login", req.nextUrl.origin));
  }
  // Deny access to authentication pages like login and register to already registered users
  if (req.auth && authPages.includes(req.nextUrl.pathname)) {
    console.log("Middleware blocked auth pages!");
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export { auth as middleware } from "@/auth"
