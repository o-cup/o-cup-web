import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import Layout from "../components/layout";
import { StyledMain } from "../styles/mainStyle";

function Main() {
	return (
		<Layout>
			<StyledMain>
				<Filter />
				<EventList />
			</StyledMain>
		</Layout>
	);
}

export default Main;
