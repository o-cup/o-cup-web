import React from "react";
import {StyledEventMain} from "../../styles/eventMainStyle";
import EventMainInfo from "./EventMainInfo";
import EventImages from "./EventImages";

function EventMain() {
    return (
        <StyledEventMain>
            <EventMainInfo/>
            <EventImages/>
        </StyledEventMain>
    )
}

export default EventMain;