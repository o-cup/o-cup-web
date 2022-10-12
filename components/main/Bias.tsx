import React from "react";
import { Link } from "react-scroll";
import { useRecoilValue } from "recoil";
import { dateFilterAtom } from "../../shared/state";
import { StyledBias, StyledBirthDayHat } from "./styles/biasStyles";
import type { PeopleType } from "../../shared/types";

const HAT = ["bday_striped", "bday_red", "bday_green"];

function Bias({ id, name, profilePic, birthday }: Partial<PeopleType>) {
	const dateFilter = useRecoilValue(dateFilterAtom);

	const getBirthdayToday = () => dateFilter.slice(5, 8) === birthday?.slice(5, 8);

	if (!id || !name) {
		return null;
	}
	return (
		<StyledBias>
			<Link to={`bias_${id}`} spy smooth offset={-64}>
				<div>
					{getBirthdayToday() && <StyledBirthDayHat className="birthday" color={HAT[id % 3]} />}
					<img alt={profilePic} src={profilePic} />
				</div>
				<p>{name}</p>
			</Link>
		</StyledBias>
	);
}

export default Bias;
