import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['ynzsmoosawwxwpgpfrzy.supabase.co'], // Add your Supabase storage host here
  },
}

export default nextConfig
