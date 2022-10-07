import React, { useEffect } from "react";
import { BiasList, EventSection } from "../components/main";
import { StyledMain } from "../components/main/styles/mainStyle";
import Layout from "../shared/components/layout";
import { setMetaTags } from "../shared/utils/metaTagHandlers";

function Main() {
	useEffect(() => {
		setMetaTags({});
		return () => {
			setMetaTags({});
		};
	}, []);

	return (
		<Layout page="main">
			<StyledMain>
				<BiasList />
				<EventSection />
			</StyledMain>
		</Layout>
	);
}

export default Main;
