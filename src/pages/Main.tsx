import React from "react";
import EventList from "../components/EventList";
import Layout from "../components/layout";
import Filter from "../components/main/Filter";
import { StyledMain } from "../styles/mainStyle";

function Main() {
	return (
		<Layout dateSelector>
			<StyledMain>
				<Filter />
				<EventList />
			</StyledMain>
		</Layout>
	);
}

export default Main;
