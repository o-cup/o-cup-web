import React, { useState } from "react";
import Layout from "../components/layout";
import { BiasList, CustomBottomSheet, SearchInput, EventList } from "../components/main";
import { StyledMain } from "../components/main/styles/mainStyle";

function Main() {
	const [open, setOpen] = useState(false);

	return (
		<Layout dateSelector>
			<>
				<StyledMain>
					<BiasList />
					<SearchInput setOpen={setOpen} />
					<EventList />
				</StyledMain>
				{open && <CustomBottomSheet setOpen={setOpen} />}
			</>
		</Layout>
	);
}

export default Main;
