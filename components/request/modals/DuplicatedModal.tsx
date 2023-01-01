import { useRouter } from "next/router";
import React from "react";
import { BiasChip, Button, Modal, Icon } from "../../../shared/components";
import { StyledBiasChip } from "../../../shared/components/biasChip/biasChipStyle";
import { convertDateWithDots } from "../../../shared/utils/dateHandlers";
import { StyledDuplicatedEvent, StyledDuplicatedModal } from "../requestStyle";
import type { EventType } from "../../../shared/types";

const Event = ({
	duplicatedEventData,
	handleClick,
}: {
	duplicatedEventData: EventType;
	handleClick?: () => void;
}) => {
	const {
		images,
		category,
		place,
		biasesId,
		requestedBiases,
		snsId,
		districts,
		startAt,
		endAt,
	} = duplicatedEventData;

	return (
		<StyledDuplicatedEvent onClick={handleClick}>
			<img src={images && images[0]} alt={place} />
			<div>
				<div className="title">
					<h2>{place}</h2>
					<img alt={category} src={`/images/categories/${category}.svg`} />
				</div>

				<div className="biases">
					{requestedBiases
						? requestedBiases.map((bias) => (
								<StyledBiasChip key={bias.id} disabled={false}>
									{bias.bias}
								</StyledBiasChip>
						  ))
						: biasesId?.map((biasId) => <BiasChip id={biasId} key={biasId} />)}
				</div>

				<div className="extraInfo">
					<p>
						<Icon name="host-gray" />@{snsId}
					</p>
					<p>
						<Icon name="place-gray" />
						{districts.name}
					</p>
					<p>
						<Icon name="calendar-gray" />
						{startAt && convertDateWithDots(startAt)} -{" "}
						{endAt && convertDateWithDots(endAt)}
					</p>
				</div>
			</div>
		</StyledDuplicatedEvent>
	);
};

Event.defaultProps = {
	handleClick: () => null,
};

type ModalProps = {
	duplicatedEventData: EventType;
	resetAllStates: () => void;
};

const DuplicatedModal = ({
	duplicatedEventData,
	resetAllStates,
}: ModalProps) => {
	const router = useRouter();

	return (
		<Modal maxWidth={340} minWidth={340}>
			<StyledDuplicatedModal>
				{duplicatedEventData.isApproved ? (
					<p>
						해당 장소, 해당 날짜로
						<br />
						이미 오컵에 아래 이벤트가 등록되어 있어요.
					</p>
				) : (
					<p>
						해당 장소, 해당 날짜로
						<br />
						현재 아래 이벤트가 승인 대기중이에요.
					</p>
				)}

				{duplicatedEventData && (
					<Event
						duplicatedEventData={duplicatedEventData}
						handleClick={() =>
							duplicatedEventData.isApproved &&
							router.push(`/detail/${duplicatedEventData.id}`)
						}
					/>
				)}

				<div className="modalBtnContainer">
					<Button
						customStyle={{
							width: "100%",
							height: "48px",
							fontSize: "14px",
							fontWeight: "bold",
							background: "#FFFFFF",
						}}
						handleClick={() => router.push("/")}
					>
						메인으로 돌아가기
					</Button>
					<Button
						customStyle={{
							width: "100%",
							height: "48px",
							fontSize: "14px",
							fontWeight: "bold",
						}}
						handleClick={resetAllStates}
					>
						다른 이벤트 중복확인
					</Button>
				</div>
			</StyledDuplicatedModal>
		</Modal>
	);
};

export default React.memo(DuplicatedModal);
