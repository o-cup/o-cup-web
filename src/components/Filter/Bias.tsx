import React from "react";
import { useRecoilState } from "recoil";
import { biasFilterAtom } from "../../state/atoms";
import { StyledBias } from "../../styles/filterStyle";
import { PeopleType } from "../../types";

function Bias({ id, name, profilePic }: Partial<PeopleType>) {

  const [biasFilter, setBiasFilter] = useRecoilState(biasFilterAtom);

  const handleClickBias = (selectedId: number) => {
    const filtered: number[] = biasFilter.includes(selectedId)
      ? [...biasFilter].filter((biasId) => biasId !== selectedId)
      : [...biasFilter, selectedId];
    setBiasFilter(filtered);
  };

  if (!id || !name) {
    return null;
  }
  return (
    <StyledBias onClick={() => id && handleClickBias(id)}
                className={biasFilter.length === 0 || biasFilter.includes(id) ? "active" : ""}>
      <div>
        <img alt={profilePic} src={profilePic} />
      </div>
      <p>{name}</p>
    </StyledBias>
  );
}

export default Bias;