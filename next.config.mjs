import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment with static export
  // output: 'export', // Commented out for development
  // trailingSlash: true, // Commented out for development
  // distDir: 'out', // Commented out for development
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    loader: 'default',
    path: '',
  },
  // Ensure proper routing for Vercel
  // skipTrailingSlashRedirect: true, // Not needed for Vercel
  // skipMiddlewareUrlNormalize: true, // Not needed for Vercel
  // Exclude API routes from static export
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure admin page is generated during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Configure build behavior - removed problematic experimental features
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Performance optimizations
  reactStrictMode: true,
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),
  webpack: (config, { dev, isServer }) => {
    // Exclude nested directories that contain API routes
    config.watchOptions = {
      ignored: ['**/dopetechdbinit/**', '**/backup/**']
    }
    
    // Ensure proper path resolution for @ alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    }
    
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      };
      
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // SVG optimization - only add if not already present
    const svgRule = config.module.rules.find(rule => rule.test && rule.test.toString().includes('svg'));
    if (!svgRule) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }
    
    return config;
  },
}

export default nextConfig
