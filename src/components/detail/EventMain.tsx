import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { EventType, DetailType } from "../../types";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { StyledEventMain } from "./styles/eventMainStyle";
import { StyledBiasChip } from "../../shared/components/BiasChip/biasChipStyle";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import { Icon } from "../../shared/components";

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
	const today = convertDateToString(new Date());

	if (!startAt || !endAt) return null;
	const isDuringEvent = isOpenToday(today, startAt, endAt);

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
