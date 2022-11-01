// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemap } from "next-sitemap";
import { supabase } from "../../supabaseClient";
import type { EventType, PeopleType } from "../../shared/types";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { data: events } = await supabase
		.from("place_sort")
		.select("*")
		.eq("isApproved", true);
	const { data: people } = await supabase.from("people").select("*");

	const lastmod = new Date().toISOString();

	const URL = process.env.SITE_URL || "https://www.o-cup.kr";

	const defaultFields = [
		{
			loc: URL,
			priority: 0.8,
			lastmod,
		},
		{
			loc: `${URL}/search`,
			priority: 0.8,
			lastmod,
		},
		{
			loc: `${URL}/request`,
			priority: 0.8,
			lastmod,
		},
	];

	const detailFields =
		events?.map((event: EventType) => ({
			loc: `${URL}/detail/${event.id}`,
			priority: 0.9,
			lastmod,
		})) || [];

	const searchFields =
		people?.map((bias: PeopleType) => ({
			loc: `${URL}/search?keyword=${bias.name}`,
			priority: 1.0,
			lastmod,
		})) || [];

	const fields = [...defaultFields, ...detailFields, ...searchFields];

	return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line  @typescript-eslint/no-empty-function
export default function Sitemap() {}
