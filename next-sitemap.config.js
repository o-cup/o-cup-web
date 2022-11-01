/** @type {import("next-sitemap").IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || "https://www.o-cup.kr",
	changefreq: "daily",
	generateRobotsTxt: true,
	exclude: ["/server-sitemap.xml"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: "Yeti",
				allow: "/",
			},
			{
				userAgent: "Googlebot",
				allow: "/",
			},
			{
				userAgent: "AdsBot-Google",
				allow: "/",
			},
			{
				userAgent: "Twitterbot",
				allow: "/",
			},
		],
		additionalSitemaps: ["https://www.o-cup.kr/server-sitemap.xml"],
	},
};
