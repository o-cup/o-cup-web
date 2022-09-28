import React, { useState } from "react";
import { EventType, DetailType } from "../../types";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { StyledDetailImgContainer, StyledDetailTextContainer, StyledEventMain } from "./styles/eventMainStyle";
import { StyledBiasChip } from "../../shared/components/BiasChip/biasChipStyle";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import { Icon } from "../../shared/components";
import PosterView from "./PosterView";

type EventMainProps = {
	data: Partial<EventType> & Partial<DetailType>;
};

const EventMain = ({ data }: EventMainProps) => {
	const { place, biasesId, organizer, startAt, endAt, images, address, requestedBiases } = data;

	const [isPosterViewOpen, setPosterViewOpen] = useState(false);

	const today = convertDateToString(new Date());

	if (!startAt || !endAt) return null;
	const isDuringEvent = isOpenToday(today, startAt, endAt);

	const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = DEFAULT_POSTER_URL;
		e.currentTarget.className = "error";
	};

	return (
		<StyledEventMain>
			<StyledDetailTextContainer>
				<div className="title">
					<h6>{place}</h6>
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

			{isPosterViewOpen && images && <PosterView images={images} setPosterViewOpen={setPosterViewOpen} />}
		</StyledEventMain>
	);
};

export default EventMain;
