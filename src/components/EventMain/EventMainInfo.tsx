import React from "react";
import {BiMap, BiUserCircle} from "react-icons/bi";
import {FiCalendar} from "react-icons/fi";
import {StyledEventMainInfo} from "../../styles/eventMainStyle";

function EventMainInfo() {
    return (
            <StyledEventMainInfo>
                <div>
                    <h6>카페 로우필름</h6>
                    <span>창빈</span>
                </div>
                <p>
                    <BiUserCircle/>
                    summer resort @Summer_resort_8
                </p>
                <p>
                    <BiMap/>
                    서울시 마포구 독막로 7길 44
                </p>
                <p>
                    <FiCalendar/>
                    {/* 2022.05.05 - 2022.05.12 */}
                    2022.08.13 - 2022.08.13
                </p>
            </StyledEventMainInfo>
    )
}

export default EventMainInfo;