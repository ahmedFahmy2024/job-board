import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/jobs",
  "/jobs/new",
  "/jobs/[slug]",
  "/job-submitted",
])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
});

export const config = {
  matcher: ["/(admin)(.*)"],
};