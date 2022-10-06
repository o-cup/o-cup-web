import React, { useState } from "react";
import { EventType } from "../../types";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { StyledDetailImgContainer, StyledDetailTextContainer, StyledEventMain } from "./styles/eventMainStyle";
import { StyledBiasChip } from "../../shared/components/BiasChip/biasChipStyle";
import BiasChip from "../../shared/components/BiasChip";
import { Icon } from "../../shared/components";
import PosterView from "./PosterView";
import { imageOnErrorHandler } from "../../shared/utils/imageHandlers";

type EventMainProps = {
	data: Partial<EventType>;
	posterPopupDisabled?: boolean;
};

const EventMain = ({ data, posterPopupDisabled }: EventMainProps) => {
	const { place, biasesId, organizer, startAt, endAt, images, address, requestedBiases } = data;

	const [isPosterViewOpen, setPosterViewOpen] = useState(false);

	const today = convertDateToString(new Date());

	if (!startAt || !endAt) return null;
	const isDuringEvent = isOpenToday(today, startAt, endAt);

	return (
		<StyledEventMain>
			<StyledDetailTextContainer>
				<div className="title">
					<p>{place}</p>
					<div className="chipContainer">
						{requestedBiases
							? requestedBiases.map((bias) =>
									bias.bias ? <StyledBiasChip key={bias.id}>{bias.bias}</StyledBiasChip> : null
							  )
							: biasesId?.map((biasId) => <BiasChip id={biasId} key={biasId} />)}
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
								{convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
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
		</StyledEventMain>
	);
};

EventMain.defaultProps = {
	posterPopupDisabled: false,
};

export default EventMain;
