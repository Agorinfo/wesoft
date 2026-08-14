import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const { hostname, protocol, port } = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    // Strapi already serves the uploaded assets. Keeping them unoptimized makes
    // the browser request their absolute URL directly instead of /_next/image.
    unoptimized: true,
    remotePatterns: [{ protocol: protocol.replace(":", "") as "http" | "https", hostname, port, pathname: "/uploads/**" }],
  },
};

export default nextConfig;
