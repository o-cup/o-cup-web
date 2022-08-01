import React from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../../apis";
import { StyledBiasList } from "../../styles/filterStyle";
import Bias from "./Bias";

function BiasList() {

  const filteredMonth = "08"; // todo: DateSelector 컴포넌트와 연결

  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => item.birthday.slice(4, 6) === filteredMonth)
  });

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