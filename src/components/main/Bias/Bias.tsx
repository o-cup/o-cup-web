import React from "react";
import { useRecoilValue } from "recoil";
import { dateFilterAtom } from "../../../state/atoms";
import { PeopleType } from "../../../types";
import { StyledBias, StyledBirthDayHat } from "./biasStyles";

const HAT = ["bday_striped", "bday_red", "bday_green"];

// todo: 공통 컴포넌트로 만들기
function Bias({ id, name, profilePic, birthday }: Partial<PeopleType>) {
	const dateFilter = useRecoilValue(dateFilterAtom);

	const handleClickBias = (selectedId: number) => {
		// TODO: 인물필터 기능 삭제, 클릭 시 스크롤 되도록
	};

	const getBirthdayToday = () => dateFilter.slice(5, 8) === birthday?.slice(5, 8);

	if (!id || !name) {
		return null;
	}
	return (
		<StyledBias onClick={() => id && handleClickBias(id)}>
			<div>
				{getBirthdayToday() && <StyledBirthDayHat className="birthday" color={HAT[id % 3]} />}
				<img alt={profilePic} src={profilePic} />
			</div>
			<p>{name}</p>
		</StyledBias>
	);
}

export default Bias;
