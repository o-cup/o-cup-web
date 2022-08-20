import React, { useState } from "react";
import { BiasList, CustomBottomSheet, EventList } from "../components/main";
import { StyledMain } from "../components/main/styles/mainStyle";
import Layout from "../shared/components/layout";

function Main() {
	const [open, setOpen] = useState(false);

	return (
		<Layout>
			<>
				<StyledMain>
					<BiasList />
					<EventList />
				</StyledMain>
				{open && <CustomBottomSheet setOpen={setOpen} />}
			</>
		</Layout>
	);
}

export default Main;
