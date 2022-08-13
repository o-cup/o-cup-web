import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchPeople } from "../../apis";
import { openedBiasAtom } from "../../state/atoms";
import Bias from "./Bias";
import { StyledBiasList } from "./styles/mainStyle";

function BiasList() {
	const [openedBias] = useRecoilState(openedBiasAtom);

	const { data: people } = useQuery(["people"], () => fetchPeople(), {
		select: (data) => data?.filter((item) => openedBias.includes(item.id)),
	});

	if (!people || !people.length) return null;
	return (
		<StyledBiasList>
			{people?.map((person) => (
				<Bias key={person.id} id={person.id} name={person.name} profilePic={person.profilePic} />
			))}
		</StyledBiasList>
	);
}

export default BiasList;
