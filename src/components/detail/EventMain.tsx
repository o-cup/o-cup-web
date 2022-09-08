import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { EventType, DetailType } from "../../types";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { StyledEventMain } from "./styles/eventMainStyle";
import { StyledBiasChip } from "../../shared/components/BiasChip/biasChipStyle";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";

type EventMainProps = Partial<EventType> & Partial<DetailType>;

const EventMain = ({
	place,
	biasesId,
	organizer,
	snsId,
	startAt,
	endAt,
	address,
	images,
	requestedBiases,
}: EventMainProps) => {
	const customPaging = (i: number) => (
		<span>
			{i + 1} / {images?.length}
		</span>
	);

	const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = DEFAULT_POSTER_URL;
		e.currentTarget.className = "error";
	};

	return (
		<StyledEventMain>
			<div className="textContainer">
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
						<img src="/images/icons/host.png" alt="host" />
						{organizer}
					</p>
					<p>
						<img src="/images/icons/place.png" alt="place" />
						{address}
					</p>
					<p>
						<img src="/images/icons/calendar.png" alt="calendar" />
						{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
					</p>
				</div>
			</div>
			{images && images.length > 0 && (
				<div className="imgContainer">
					{images?.length === 1 ? (
						/* 이미지 갯수 하나인경우 슬라이드 되지 않음 */
						<div className="slick-slider">
							<img alt={images[0]} src={images[0]} onError={imageOnErrorHandler} />
							<ul className="slick-dots">
								<li className="slick-active">
									<span>1 / 1</span>
								</li>
							</ul>
						</div>
					) : (
						<Slider
							dots
							infinite
							slidesToShow={1}
							slidesToScroll={1}
							arrows={false}
							adaptiveHeight={false}
							customPaging={customPaging}
						>
							{images?.length &&
								images?.map((img) => <img alt={img} src={img} key={img} onError={imageOnErrorHandler} />)}
						</Slider>
					)}
				</div>
			)}
		</StyledEventMain>
	);
};

export default EventMain;
