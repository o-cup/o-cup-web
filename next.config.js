// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["react-date-range-ts"]);

const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	// next/image 사용을 위한 CDN host 정의
	images: {
		domains: ["qxcfvgkruqxdxfhrkgzu.supabase.co"],
	},
};

module.exports = withTM(nextConfig);
