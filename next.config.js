const withTM = require("next-transpile-modules")(["react-date-range-ts"]);

const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

module.exports = withTM(nextConfig);

/*
module.exports = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};
*/
