import React from "react";
import { BiUserCircle, BiMap } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StyledItem } from "../../styles/eventListStyle";
import { Event } from "../../types";

type EventListItemProps = {
  event: Event;
};

function EventListItem({ event }: EventListItemProps) {
  const navigate = useNavigate();

  return (
    <StyledItem onClick={() => navigate(`/detail?id=${event.id}`)}>
      <div>
        <img alt="sample" src={event.images[0]} />
      </div>
      <div>
        <h6>{event.place}</h6>
        <span>{event.bias[0]}</span>
      </div>
      <p>
        <BiUserCircle />
        {event.organizer} {event.snsId}
      </p>
      <p>
        <BiMap />
        {event.district}
      </p>
      <p>
        <FiCalendar />
        {/* 2022.05.05 - 2022.05.12 */}
        {event.startAt}-{event.endAt}
      </p>
    </StyledItem>
  );
}

export default EventListItem;
