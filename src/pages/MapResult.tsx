import React from "react";
import { useQuery } from "react-query";
import { fetchSearchedEvent } from "../apis/search";
import { StyledLayout } from "../shared/components/layout/styles/layoutStyle";
import { StyledMapHeader, StyledMapResultContainer } from "../components/mapResult/styles/mapStyle";
import FullMap from "../components/mapResult/FullMap";

function MapResult() {
	// TODO: 검색 로직 파악 후 수정, 현재 정한(57)으로 샘플 검색 중
	const { data: events } = useQuery(["map"], () => fetchSearchedEvent({ biasId: 57 }));

	return (
		<StyledLayout>
			<StyledMapResultContainer>
				<StyledMapHeader>
					<button type="button">
						<img src="/images/icons/arrow-left.png" alt="back" />
					</button>
					<button type="button">
						<img src="/images/icons/share.png" alt="share" />
					</button>
				</StyledMapHeader>
				<FullMap events={events || []} />
			</StyledMapResultContainer>
		</StyledLayout>
	);
}

export default MapResult;
