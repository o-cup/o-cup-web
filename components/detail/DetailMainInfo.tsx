import React, { useState } from "react";
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

type DetailMainInfoProps = {
	data: Partial<EventType>;
	posterPopupDisabled?: boolean;
};

const DetailMainInfo = ({ data, posterPopupDisabled }: EventMainProps) => {
	const {
		place,
		category,
		biasesId,
		organizer,
		startAt,
		endAt,
		images,
		address,
		requestedBiases,
	} = data;

	const [isPosterViewOpen, setPosterViewOpen] = useState(false);

	const today = convertDateToString(new Date());

	if (!startAt || !endAt) return null;
	const isDuringEvent = isOpenToday(today, startAt, endAt);

	return (
		<StyledDetailMainInfo>
			<StyledDetailTextContainer>
				<StyledDetailCategory type={category || "A"} />
				<div className="title">
					<p>{place}</p>
					<div className="chipContainer">
						{requestedBiases
							? requestedBiases.map((bias) =>
									bias.bias ? (
										<StyledBiasChip key={bias.id}>{bias.bias}</StyledBiasChip>
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
						<p>{organizer}</p>
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

			{!posterPopupDisabled && isPosterViewOpen && images && (
				<PosterView images={images} setPosterViewOpen={setPosterViewOpen} />
			)}
		</StyledDetailMainInfo>
	);
};

DetailMainInfo.defaultProps = {
	posterPopupDisabled: false,
};

export default DetailMainInfo;
