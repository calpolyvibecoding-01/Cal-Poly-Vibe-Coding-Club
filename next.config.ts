import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /**
   * The member app (sign-up, login, roster, builds) is a SEPARATE Next.js
   * deployment, not a route in this project — but by request it must never
   * look like one. This proxies everything under /portal to that other
   * deployment's own /portal/* (it carries a matching `basePath: "/portal"`
   * in its own next.config.ts — see the comment there for why), so the
   * response streams back through THIS domain. The browser's address bar
   * never shows anything but calpolyvibecoding.com; Set-Cookie headers from
   * the proxied response land on this origin, which is what lets the member
   * app's session cookies work at all under this scheme.
   *
   * The destination is the OTHER project's stable production alias, not a
   * specific deployment URL — it always resolves to whatever is currently
   * in production there, the same way this rewrite doesn't need touching
   * when that project ships a new deploy.
   */
  async rewrites() {
    return [
      /**
       * TWO RULES, NOT ONE, AND THE SPLIT IS LOAD-BEARING.
       *
       * A single `{ source: "/portal/:path*", destination: ".../portal/:path*" }`
       * looks like it should cover the bare "/portal" too — `:path*` is
       * "zero or more" — but the destination TEMPLATE keeps its literal "/"
       * before `:path*` even when the param matches nothing. So a request
       * for exactly "/portal" got proxied to ".../portal/" (a real trailing
       * slash), the member app's own trailingSlash:false redirected that
       * back to ".../portal", and this same rule caught THAT request too —
       * an infinite loop, live in production, invisible in every local test
       * because local testing only ever hit /portal/join, /portal/login —
       * paths with a real segment after the slash, where the bug doesn't
       * exist. Confirmed via curl -D-, not guessed: the response was
       * Vercel's own "too many redirects" fallback page.
       *
       * The fix used everywhere this pattern is documented: an exact rule
       * for the bare path with no trailing slash in its destination, and
       * the catch-all for everything under it.
       */
      {
        source: "/portal",
        destination: "https://calpolyvibecoding.vercel.app/portal",
      },
      {
        source: "/portal/:path*",
        destination: "https://calpolyvibecoding.vercel.app/portal/:path*",
      },
    ];
  },
};

export default nextConfig;
