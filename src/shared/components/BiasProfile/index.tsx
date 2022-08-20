import React from "react";
import { StyledBiasProfile } from "./biasProfileStyle";

type BiasProfileProps = {
	biasName: string;
	imgUrl: string;
};

const BiasProfile = ({ biasName, imgUrl }: BiasProfileProps) => (
	<StyledBiasProfile>
		<div>
			<img alt={biasName} src={imgUrl} />
			<p>{biasName}</p>
		</div>
	</StyledBiasProfile>
);

export default BiasProfile;
