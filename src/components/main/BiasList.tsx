import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchPeople } from "../../apis";
import { dateFilterAtom, openedBiasAtom } from "../../state/atoms";
import Bias from "./Bias";
import { StyledBiasList, StyledBias } from "./styles/mainStyle";

function BiasList() {
	const navigate = useNavigate();
	const [openedBias] = useRecoilState(openedBiasAtom);
	const selectedDate = useRecoilValue(dateFilterAtom);

	const { data: people } = useQuery(["people", selectedDate], () => fetchPeople(), {
		select: (data) => {
			const biasesData = data?.filter((item) => openedBias.includes(item.id)) || [];

			const biasList = [];
			const birthdayPeople = biasesData?.filter((bias) => bias.birthday.slice(-4) === selectedDate.slice(-4));
			biasList.push(...birthdayPeople);

			const biases = biasesData.filter((bias) => !birthdayPeople.includes(bias));
			biasList.push(...biases);

			return biasList;
		},
	});

	return (
		<StyledBiasList>
			{people && people?.length ? (
				people.map((person) => (
					<Bias
						key={person.id}
						id={person.id}
						name={person.name}
						profilePic={person.profilePic}
						birthday={person.birthday}
					/>
				))
			) : (
				<StyledBias className="active" onClick={() => navigate("/search")}>
					<div>
						<img id="search" src="/images/icons/search.png" alt="search" />
					</div>
					<p>검색하기</p>
				</StyledBias>
			)}
		</StyledBiasList>
	);
}

export default BiasList;
