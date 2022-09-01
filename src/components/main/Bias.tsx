import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { biasFilterAtom, dateFilterAtom } from "../../state/atoms";
import { PeopleType } from "../../types";
import { StyledBias, StyledBirthDayHat } from "./styles/mainStyle";

const HAT = ["bday_striped", "bday_red", "bday_green"];

// todo: 공통 컴포넌트로 만들기
function Bias({ id, name, profilePic, birthday }: Partial<PeopleType>) {
  const [biasFilter, setBiasFilter] = useRecoilState(biasFilterAtom);
  const dateFilter = useRecoilValue(dateFilterAtom);

	const handleClickBias = (selectedId: number) => {
		const filtered: number[] = biasFilter.includes(selectedId)
			? [...biasFilter].filter((biasId) => biasId !== selectedId)
			: [...biasFilter, selectedId];
		setBiasFilter(filtered);
	};

  const getBirthdayToday = () => dateFilter.slice(5, 8) === birthday?.slice(5, 8);

  if (!id || !name) {
    return null;
  }
  return (
    <StyledBias
      onClick={() => id && handleClickBias(id)}
      className={biasFilter.length === 0 || biasFilter.includes(id) ? "active" : ""}
    >
      <div>
        {getBirthdayToday() && <StyledBirthDayHat className="birthday" color={HAT[id % 3]} />}
        <img alt={profilePic} src={profilePic} />
      </div>
      <p>{name}</p>
    </StyledBias>
  );
}

export default Bias;
