import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchPeople } from "../../apis";
import { openedBiasAtom } from "../../state/atoms";
import Bias from "./Bias";
import { StyledBiasList, StyledBias } from "./styles/mainStyle";

function BiasList() {
  const navigate = useNavigate();

  const [openedBias] = useRecoilState(openedBiasAtom);

  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => openedBias.includes(item.id)),
  });

  return (
    <StyledBiasList>
      {(people && people?.length > 0) ? people.map((person) => (
          <Bias key={person.id} id={person.id} name={person.name} profilePic={person.profilePic}
                birthday={person.birthday} />
        )) :
        <StyledBias className="active" onClick={() => navigate("/search")}>
          <div>
            <img id="search" src="/images/icons/search.png" alt="search" />
          </div>
          <p>검색하기</p>
        </StyledBias>}
    </StyledBiasList>
  );
}

export default BiasList;
