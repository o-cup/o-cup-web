import React from "react";
import {StyledTwitterInfo} from "../../styles/twitterInfoStyle";
import OrganiserAccount from "./OrganiserAccount";
import HashTags from "./HashTags";

function TwitterInfo() {
    return (
        <StyledTwitterInfo>
            <OrganiserAccount/>
            <HashTags/>
        </StyledTwitterInfo>
    )
}

export default TwitterInfo;