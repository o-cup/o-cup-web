import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { monthState } from "../../state/atoms";
import { fetchPeople } from "../../apis";
import { StyledBiasList } from "../../styles/filterStyle";
import Bias from "./Bias";

function BiasList() {
  const [month] = useRecoilState(monthState);

  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => item.birthday.slice(4, 6) === month)
  });

  if(!people || !people.length) return null;
  return (
    <StyledBiasList>
      {people?.map((person) =>
        <Bias key={person.id}
              name={person.name}
              profilePic={person.profilePic} />)}
    </StyledBiasList>
  );
}

export default BiasList;