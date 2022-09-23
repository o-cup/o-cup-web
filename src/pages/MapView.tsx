import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchSearchedEvent } from "../apis/search";
import { StyledLayout } from "../shared/components/layout/styles/layoutStyle";
import { StyledMapViewContainer } from "../components/mapView/styles/mapStyle";
import MapHeader from "../components/mapView/MapHeader";
import FullMap from "../components/mapView/FullMap";
import MapResult from "../components/mapView/MapResult";
import Loading from "../shared/components/Loading";

function MapView() {
	const [isLoading, setLoading] = useState(true);

	// TODO: 검색 로직 파악 후 수정, 현재 정한(57)으로 샘플 검색 중
	const { data: events } = useQuery(["map"], () => fetchSearchedEvent({ biasId: 57 }));

	return (
		<StyledLayout>
			{isLoading && <Loading />}
			<StyledMapViewContainer>
				<MapHeader />
				<FullMap events={events || []} setLoading={setLoading} />
				<MapResult events={events || []} />
			</StyledMapViewContainer>
		</StyledLayout>
	);
}

export default MapView;
