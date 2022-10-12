import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchPeople } from "../../shared/apis/common";
import { Loading } from "../../shared/components";
import { openedBiasAtom, dateFilterAtom } from "../../shared/state";
import Bias from "./Bias";
import { StyledBias, StyledBiasList } from "./styles/biasStyles";

const BiasList = () => {
	const router = useRouter();
	const openedBias = useRecoilValue(openedBiasAtom);
	const dateFilter = useRecoilValue(dateFilterAtom);

	const { data: people, isLoading } = useQuery(["people", dateFilter], () => fetchPeople(), {
		select: (data) => {
			const biasesData = data?.filter((item) => openedBias.includes(item.id)) || [];

			const birthdayPeople = biasesData?.filter((bias) => bias.birthday.slice(-4) === dateFilter.slice(-4));
			const biases = biasesData.filter((bias) => !birthdayPeople.includes(bias));

			return [...birthdayPeople, ...biases];
		},
	});

	if (isLoading) {
		return <Loading />;
	}
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
				<StyledBias className="active" onClick={() => router.push("/search")}>
					<div>
						<img id="search" src="/images/icons/search.png" alt="search" />
					</div>
					<p>검색하기</p>
				</StyledBias>
			)}
		</StyledBiasList>
	);
};

export default BiasList;
