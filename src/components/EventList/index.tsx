import React from "react";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";

function EventList() {

    return (
        <StyledList>
            <EventListItem />
            <EventListItem />
            <EventListItem />
        </StyledList>
    )
}

export default EventList;