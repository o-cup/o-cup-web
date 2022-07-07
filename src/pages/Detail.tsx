import React from "react";
import Layout from "../components/layout";
import EventMain from "../components/EventMain";
import {StyledDetail} from "../styles/detailStyle";
import TwitterInfo from "../components/TwitterInfo";
import SpecialGoodsInfo from "../components/SpecialGoodsInfo";
import Location from "../components/Location";
import EventNearHere from "../components/EventsNearHere";

function Detail() {
    return (
        <Layout>
            <StyledDetail>
                <EventMain/>
                <TwitterInfo/>
                <SpecialGoodsInfo/>
                <Location/>
                <EventNearHere/>
            </StyledDetail>
        </Layout>
    );
}

export default Detail;
