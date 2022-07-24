import React from "react";
import { StyledLocation } from "../../styles/locationStyle";
import { DetailType } from "../../types";
import Map from "./Map";

function Location({ address }: Partial<DetailType>) {
  return (
    <StyledLocation>
      <h4>위치</h4>
      <Map address={address} />
      <p>{address}</p>
    </StyledLocation>
  );
}

export default Location;
