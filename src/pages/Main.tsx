import React from "react";
import { BiasList, EventList } from "../components/main";
import { StyledMain } from "../components/main/styles/mainStyle";
import Layout from "../shared/components/layout";

function Main() {
	return (
		<Layout page="main">
			<StyledMain>
				<BiasList />
				<EventList />
			</StyledMain>
		</Layout>
	);
}

export default Main;
