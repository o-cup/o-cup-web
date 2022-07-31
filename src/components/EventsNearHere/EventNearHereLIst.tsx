import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledEventNearHereList } from "../../styles/eventNearHereStyle";
import { EventType } from "../../types";

function EventNearHereList({ id, images, place, organizer }: Partial<EventType>) {

  const navigate = useNavigate();
  const previewUrl = (images && images[0]) || "";

  return (
    <StyledEventNearHereList onClick={() => navigate(`/detail/${id}`)}>
      {previewUrl && <img alt={previewUrl} src={previewUrl} />}
      <div>
        <h6>{place}</h6>
        <p>{organizer}</p>
      </div>
    </StyledEventNearHereList>
  );
}

export default EventNearHereList;