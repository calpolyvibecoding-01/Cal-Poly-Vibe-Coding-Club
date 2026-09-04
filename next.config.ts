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
      {
        source: "/portal/:path*",
        destination: "https://calpolyvibecoding.vercel.app/portal/:path*",
      },
    ];
  },
};

export default nextConfig;
