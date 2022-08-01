import React from "react";
import { StyledBias } from "../../styles/filterStyle";
import { PeopleType } from "../../types";

function Bias({ name, profilePic }: Partial<PeopleType>) {

  return (
    <StyledBias>
      <div>
        <img alt={profilePic} src={profilePic} />
      </div>
      <p>{name}</p>
    </StyledBias>
  );
}

export default Bias;