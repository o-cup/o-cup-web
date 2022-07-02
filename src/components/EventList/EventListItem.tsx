import React from "react";
import { BiUserCircle, BiMap } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { StyledItem } from "../../styles/eventListStyle";

function EventListItem() {
    return (
        <StyledItem>
            <div>
                <img alt="sample"
                    src="https://pbs.twimg.com/media/E2Tzs9TVgAQh6Vd?format=jpg&name=large" />
            </div>
            <div>
                <h6>카페 이름</h6>
                <span>가수</span>
            </div>
            <p>
                <BiUserCircle />
                주최자 이름 @주최자계정
            </p>
            <p>
                <BiMap />
                서울시 마포구
            </p>
            <p>
                <FiCalendar />
                2022.05.05 - 2022.05.12
            </p>
        </StyledItem>
    )
}

export default EventListItem;