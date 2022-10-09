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

const BiasProfile = ({ biasName, imgUrl, handleClick, id }: BiasProfileProps) => {
	const { data } = useQuery(["events", id], () => fetchEventsByBiasId(id));
	if (!data?.length) return null;

	return (
		<StyledBiasProfile onClick={handleClick}>
			<div>
				<LazyLoadImage wrapperClassName="lazy-image" alt={biasName} src={imgUrl} effect="blur" />
				<p>{biasName}</p>
			</div>
		</StyledBiasProfile>
	);
};

export default BiasProfile;
