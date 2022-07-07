import React from "react";
import { StyledLocation } from "../../styles/locationStyle";
import Map from "./Map";

function Location() {
    return (
        <StyledLocation>
            <h4>위치</h4>
            <Map/>
            <p>서울시 용산구 한강대로10길 11-48 1층 마린커피 </p>
        </StyledLocation>
    )
}

export default Location;