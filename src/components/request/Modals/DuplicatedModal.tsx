import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaMapMarkerAlt, FaTwitter, FaUserCircle } from "react-icons/fa";
import { StyledDuplicatedEvent, StyledDuplicatedModal } from "../styles/requestStyle";
import { StyledBiasChip } from "../../../shared/components/BiasChip/biasChipStyle";
import Modal from "../../../shared/components/Modal";
import Button from "../../../shared/components/Button";
import BiasChip from "../../../shared/components/BiasChip";
import { EventType } from "../../../types";
import { convertDateWithDots } from "../../../shared/utils/dateHandlers";

const Event = ({ duplicatedEventData, handleClick }: { duplicatedEventData: EventType, handleClick?: () => void; }) => {
  const { images, place, biasesId, requestedBiases, organizer, snsId, district, startAt, endAt } = duplicatedEventData;

  return (
    <StyledDuplicatedEvent onClick={handleClick}>
      <img src={images[0]} alt={place} />
      <div>
        <div className="title">
          <h2>{place}</h2>
        </div>

        <div className="biases">
          {requestedBiases
            ? requestedBiases.map((bias) =>
              <StyledBiasChip key={bias.id}>
                {bias.bias}
              </StyledBiasChip>)
            : biasesId?.map((biasId) => (
              <BiasChip id={biasId} key={biasId} />
            ))}
        </div>

        <div className="extraInfo">
          <p>
            <FaUserCircle />
            {organizer}
          </p>
          <p>
            <FaTwitter />@{snsId}
          </p>
          <p>
            <FaMapMarkerAlt />
            {district}
          </p>
          <p>
            <FaCalendar />
            {startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
          </p>
        </div>
      </div>
    </StyledDuplicatedEvent>
  );
};

Event.defaultProps = {
  handleClick: () => console.log("click"),
};

type ModalProps = {
  duplicatedEventData: EventType;
  resetAllStates: () => void;
};

const DuplicatedModal = ({ duplicatedEventData, resetAllStates }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal maxWidth={340} minWidth={340}>
      <StyledDuplicatedModal>
        {duplicatedEventData.isApproved ?
          <p>
            해당 장소, 해당 날짜로<br />
            이미 오컵에 아래 이벤트가 등록되어 있어요.
          </p>
          : <p>
            해당 장소, 해당 날짜로<br />
            현재 아래 이벤트가 승인 대기중이에요.
          </p>}
        <Event duplicatedEventData={duplicatedEventData}
               handleClick={duplicatedEventData.isApproved
                 ? () => navigate(`/detail/${duplicatedEventData.id}`)
                 : () => console.log("승인 대기중")} />

        <div className="modalBtnContainer">
          <Button
            customStyle={{ width: "100%", height: "48px", fontSize: "14px", fontWeight: "bold", background: "#FFFFFF" }}
            handleClick={() => navigate("/")}>
            메인으로 돌아가기
          </Button>
          <Button
            customStyle={{ width: "100%", height: "48px", fontSize: "14px", fontWeight: "bold" }}
            handleClick={resetAllStates}>
            다른 이벤트 중복확인
          </Button>
        </div>
      </StyledDuplicatedModal>
    </Modal>
  );
};

export default DuplicatedModal;
