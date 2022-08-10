import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { dateFilterAtom } from "../../state/atoms";
import { fetchPeople } from "../../apis";
import { StyledBiasList } from "../../styles/filterStyle";
import Bias from "./Bias";

function BiasList() {
  const [dateFilter] = useRecoilState(dateFilterAtom);

  // todo: 해당 날짜에 이벤트 열려있는 아티스트로 filter 조건 개선 필요
  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => item.birthday.slice(4, 6) === dateFilter.slice(4, 6))
  });

  if (!people || !people.length) return null;
  return (
    <StyledBiasList>
      {people?.map((person) =>
        <Bias key={person.id}
              id={person.id}
              name={person.name}
              profilePic={person.profilePic} />)}
    </StyledBiasList>
  );
}

export default BiasList;