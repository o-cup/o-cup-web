import React from "react";
import { StyledBiasProfile } from "./biasProfileStyle";

type BiasProfileProps = {
	biasName: string;
	imgUrl: string;
	handleClick: () => void;
};

const BiasProfile = ({ biasName, imgUrl, handleClick }: BiasProfileProps) => (
	<StyledBiasProfile onClick={handleClick}>
		<div>
			<img alt={biasName} src={imgUrl} />
			<p>{biasName}</p>
		</div>
	</StyledBiasProfile>
);

export default BiasProfile;
