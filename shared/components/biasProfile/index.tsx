import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { fetchEventsByBiasId } from "../../apis/search";
import { StyledBiasProfile } from "./biasProfileStyle";

type BiasProfileProps = {
	biasName: string;
	imgUrl: string;
	handleClick: () => void;
	id: number;
};

const BiasProfile = ({
	biasName,
	imgUrl,
	handleClick,
	id,
}: BiasProfileProps) => {
	const { data: availableEvents } = useQuery(
		["events", id],
		() => fetchEventsByBiasId(id),
		{
			select: (data) => {
				const thisYear = new Date().getFullYear();
				const prevYear = thisYear - 1;

				const result = data?.filter((item) => {
					const eventStartYear = item.startAt.slice(0, 4) * 1;
					const eventEndYear = item.endAt.slice(0, 4) * 1;

					// NOTE: 12월에 시작해서 1월에 끝나는 이벤트 처리
					if (eventStartYear !== eventEndYear) {
						return eventEndYear === thisYear || eventStartYear === prevYear;
					}
					return eventEndYear === thisYear;
				});
				return result;
			},
		}
	);

	if (!availableEvents?.length) return null;

	return (
		<StyledBiasProfile onClick={handleClick}>
			<div>
				<LazyLoadImage
					wrapperClassName="lazy-image"
					alt={biasName}
					src={imgUrl}
					effect="blur"
				/>
				<p>{biasName}</p>
			</div>
		</StyledBiasProfile>
	);
};

export default BiasProfile;
