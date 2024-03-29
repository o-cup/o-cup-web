import Image from "next/image";
import React, { useState } from "react";
import { BiasChip, Icon } from "../../shared/components";
import { StyledBiasChip } from "../../shared/components/biasChip/biasChipStyle";
import {
	convertDateToString,
	convertDateWithDots,
	isOpenToday,
	imageOnErrorHandler,
} from "../../shared/utils";
import PosterView from "../detail/PosterView";
import {
	StyledDetailCategory,
	StyledDetailImgContainer,
	StyledDetailMainInfo,
	StyledDetailTextContainer,
} from "../detail/styles/detailMainInfoStyle";
import type { EventType } from "../../shared/types";

type EventMainProps = {
	data: Partial<EventType>;
	posterPopupDisabled?: boolean;
};

const DetailMainInfo = ({ data, posterPopupDisabled }: EventMainProps) => {
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

	const [isPosterViewOpen, setPosterViewOpen] = useState(false);

	const today = convertDateToString(new Date());

	if (!startAt || !endAt) return null;
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
					<Image
						src={images[0]}
						width={436}
						height={616}
						layout="responsive"
						objectFit="cover"
						alt="poster"
						onError={imageOnErrorHandler}
					/>

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
