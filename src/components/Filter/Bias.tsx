import React from "react";
import { useRecoilState } from "recoil";
import { biasState } from "../../state/atoms";
import { StyledBias } from "../../styles/filterStyle";
import { PeopleType } from "../../types";

function Bias({ name, profilePic }: Partial<PeopleType>) {

  const [bias, setBias] = useRecoilState(biasState);

  const handleClickBias = (n: string) => {
    setBias(n);
  };

  if (!name) {
    return null;
  }
  return (
    <StyledBias onClick={() => handleClickBias(name)}
                className={bias === "" || bias === name ? "active" : ""}>
      <div>
        <img alt={profilePic} src={profilePic} />
      </div>
      <p>{name}</p>
    </StyledBias>
  );
}

export default Bias;