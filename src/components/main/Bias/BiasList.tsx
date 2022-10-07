import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchPeople } from "../../../apis";
import { dateFilterAtom, openedBiasAtom } from "../../../state/atoms";
import Bias from "./Bias";
import { StyledBiasList, StyledBias, StyledBiasListContainer } from "./biasStyles";
import Loading from "../../../shared/components/Loading";
import Icons from "../../../shared/components/Icon/Icons";
import { convertDateToString, convertStringToDate } from "../../../shared/utils/dateHandlers";

function BiasList() {
	const navigate = useNavigate();
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

	const isToday = dateFilter === convertDateToString(new Date());
	const monthIndex = convertStringToDate(dateFilter).getMonth();
	const date = convertStringToDate(dateFilter).getDate();

	if (isLoading) {
		return <Loading />;
	}
	return (
		<StyledBiasListContainer>
			<div className="dateTitle">
				<Icons name="left-arrow-circle" />
				<p>{isToday ? "오늘" : `${monthIndex + 1}월 ${date}일`}의 이벤트</p>
				<Icons name="right-arrow-circle" />
			</div>
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
		</StyledBiasListContainer>
	);
}

export default BiasList;
