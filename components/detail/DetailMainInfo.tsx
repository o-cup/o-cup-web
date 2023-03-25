import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { BiasChip, Icon } from "../../shared/components";
import { StyledBiasChip } from "../../shared/components/biasChip/biasChipStyle";
import {
	convertDateToString,
	convertDateWithDots,
	isOpenToday,
	imageOnErrorHandler,
} from "../../shared/utils";
import PosterView from "./PosterView";
import {
	StyledDetailImgContainer,
	StyledDetailTextContainer,
	StyledDetailMainInfo,
	StyledDetailCategory,
} from "./styles/detailMainInfoStyle";
import type { EventType } from "../../shared/types";

const DetailMainInfo = () => {
	const queryClient = useQueryClient();
	const [isPosterViewOpen, setPosterViewOpen] = useState(false);

	const data = queryClient.getQueryData(["detail"]) as EventType;
	const {
		place,
		category,
		biasesId,
		snsId,
		startAt,
		endAt,
		images,
		address,
		requestedBiases,
	} = data;

	if (!startAt || !endAt) return null;
	const today = convertDateToString(new Date());
	const isDuringEvent = isOpenToday(today, startAt, endAt);

	return (
		<StyledDetailMainInfo>
			<StyledDetailTextContainer>
				{category && <StyledDetailCategory type={category} />}
				<div className="title">
					<p>{place}</p>
					<div className="chipContainer">
						{requestedBiases
							? requestedBiases.map((bias) =>
									bias.bias ? (
										<StyledBiasChip key={bias.id} disabled={false}>
											{bias.bias}
										</StyledBiasChip>
									) : null
							  )
							: biasesId?.map((biasId) => (
									<BiasChip id={biasId} key={biasId} />
							  ))}
					</div>
				</div>
				<ul>
					<li>
						<Icon name="host" />
						<p>{snsId ? `@${snsId}` : "-"}</p>
					</li>
					<li>
						<Icon name="place" />
						<p>{address}</p>
					</li>
					<li>
						<Icon name="calendar" />
						{startAt && (
							<p>
								{convertDateWithDots(startAt)} -{" "}
								{endAt && convertDateWithDots(endAt)}
							</p>
						)}
						{isDuringEvent && (
							<span className="eventDay">
								<i />
								EVENT DAY!
							</span>
						)}
					</li>
				</ul>
			</StyledDetailTextContainer>
			{images && images.length > 0 && (
				<StyledDetailImgContainer onClick={() => setPosterViewOpen(true)}>
					<img alt={images[0]} src={images[0]} onError={imageOnErrorHandler} />

					<div className="imgZoom">
						<img alt="zoom" src="/images/icons/zoom_white.png" />
					</div>
				</StyledDetailImgContainer>
			)}

			{isPosterViewOpen && images && (
				<PosterView images={images} setPosterViewOpen={setPosterViewOpen} />
			)}
		</StyledDetailMainInfo>
	);
};

DetailMainInfo.defaultProps = {
	posterPopupDisabled: false,
};

export default DetailMainInfo;
