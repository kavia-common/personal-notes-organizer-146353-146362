import type { NextConfig } from "next";

// For standard server/development mode (with API routes/Dynamic SSR),
// do NOT set output: "export". Leave nextConfig empty, or configure as needed.
const nextConfig: NextConfig = {
  // Remove output: export, so the build produces .next/server/pages-manifest.json
};

export default nextConfig;
