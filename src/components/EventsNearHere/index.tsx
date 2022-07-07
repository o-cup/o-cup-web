import React from "react";
import {StyledEventNearHere} from "../../styles/eventNearHereStyle";
import EventNearHereList from "./EventNearHereLIst";

function EventNearHere() {
    return (
        <StyledEventNearHere>
            <h4>가까운 연관 이벤트</h4>
            <ul>
                <EventNearHereList/>
                <EventNearHereList/>
                <EventNearHereList/>
                <EventNearHereList/>
                <EventNearHereList/>
            </ul>
        </StyledEventNearHere>
    )
}

export default EventNearHere;