import dynamic from "next/dynamic";
import React from "react";

const DynamicSearch = dynamic(() => import("../components/search"), {
	ssr: false,
});

const SearchPage = () => <DynamicSearch />;

export default SearchPage;
