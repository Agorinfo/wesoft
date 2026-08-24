import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const { hostname, protocol, port } = new URL(strapiUrl);
const strapiOrigin = new URL(strapiUrl).origin;
const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js and the JSON-LD metadata emit inline scripts. A nonce-based CSP
  // would disable the site's static rendering and ISR, so this is the strict
  // compatible policy recommended by Next.js for this rendering model.
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${strapiOrigin}`,
  "font-src 'self' data:",
  `connect-src 'self' ${strapiOrigin}`,
  `media-src 'self' ${strapiOrigin}`,
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Strapi opens the standard Preview in an admin iframe. The CMS origin is
  // the only external origin that may frame the public site.
  `frame-ancestors 'self' ${strapiOrigin}`,
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "accelerometer=(), autoplay=(self), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
];

const nextConfig: NextConfig = {
  images: {
    // Strapi already serves the uploaded assets. Keeping them unoptimized makes
    // the browser request their absolute URL directly instead of /_next/image.
    unoptimized: true,
    remotePatterns: [{ protocol: protocol.replace(":", "") as "http" | "https", hostname, port, pathname: "/uploads/**" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
