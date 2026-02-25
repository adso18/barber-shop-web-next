import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	cacheComponents: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		minimumCacheTTL: 60,
	},

	poweredByHeader: false,
	experimental: {
		optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns', 'lodash-es'],
	},
};

export default nextConfig;
