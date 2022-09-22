import React, { useState } from "react";
import { EventType, DetailType } from "../../types";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { StyledDetailImgContainer, StyledDetailTextContainer, StyledEventMain } from "./styles/eventMainStyle";
import { StyledBiasChip } from "../../shared/components/BiasChip/biasChipStyle";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import { Icon } from "../../shared/components";
import PosterView from "./PosterView";

type EventMainProps = Partial<EventType> & Partial<DetailType>;

const EventMain = ({
	place,
	biasesId,
	organizer,
	startAt,
	endAt,
	address,
	images,
	requestedBiases,
}: EventMainProps) => {
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
				<div className="mainInfo">
					<p>
						<Icon name="host" />
						{organizer}
					</p>
					<p>
						<Icon name="place" />
						{address}
					</p>
					<p>
						<Icon name="calendar" />
						{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
						{isDuringEvent && (
							<span>
								<i />
								EVENT DAY!
							</span>
						)}
					</p>
				</div>
			</StyledDetailTextContainer>
			{images && images.length > 0 && (
				<StyledDetailImgContainer onClick={() => setPosterViewOpen(true)}>
					<img alt={images[0]} src={images[0]} onError={imageOnErrorHandler} />
					<div className="imgPage">
						<span>1 / {images.length}</span>
					</div>
				</StyledDetailImgContainer>
			)}

			{isPosterViewOpen && images && <PosterView images={images} setPosterViewOpen={setPosterViewOpen} />}
		</StyledEventMain>
	);
};

export default EventMain;
