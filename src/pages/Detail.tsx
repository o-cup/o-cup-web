import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import EventMain from "../components/EventMain";
import { StyledDetail } from "../styles/detailStyle";
import TwitterInfo from "../components/TwitterInfo";
import GoodsInfo from "../components/GoodsInfo";
import Location from "../components/Location";
import EventNearHere from "../components/EventsNearHere";
import { fetchEventDetail } from "../apis";
import { EventType, DetailType } from "../types";

const Detail = () => {
  const { id } = useParams();

  const { data: combinedDetail }: EventType & DetailType | any = useQuery(["detail", id], () => fetchEventDetail({ id }), {
    enabled: !!id
  });

  if (!combinedDetail) return null;
  console.log(combinedDetail);
  const {
    place,
    bias,
    organizer,
    snsId,
    startAt,
    endAt,
    images,
    district,
    address,
    goods,
    hashTags,
    tweetUrl
  } = combinedDetail;

  return (
    <Layout>
      <StyledDetail>
        <EventMain
          place={place}
          bias={bias}
          organizer={organizer}
          snsId={snsId}
          startAt={startAt}
          endAt={endAt}
          address={address}
          images={images}
        />
        <div>
          <TwitterInfo organizer={organizer} snsId={snsId} hashTags={hashTags} />
          <GoodsInfo goods={goods} tweetUrl={tweetUrl} />
          <Location address={address} />
          <EventNearHere bias={bias} district={district} />
        </div>
      </StyledDetail>
    </Layout>
  );
};

export default Detail;
