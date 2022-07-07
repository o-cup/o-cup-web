import React from "react";
import {StyledEventNearHereList} from "../../styles/eventNearHereStyle";


function EventNearHereList() {
    return (
        <StyledEventNearHereList>
            <img alt="sample" src="https://pbs.twimg.com/media/FWgAyjfaIAEHkKO?format=jpg&name=4096x4096"/>
            <div>
                <h6>열글자 넘는 카페이름</h6>
                <p>호시 by TILL THE TOP</p>
            </div>
        </StyledEventNearHereList>
    )
}

export default EventNearHereList;