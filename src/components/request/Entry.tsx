import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestBasicAtom } from "../../state/atoms";
import { StyledEntry, StyledRequestModal } from "./styles/requestStyle";
import Button from "../../shared/components/Button";
import BasicInput from "./units/BasicInput";
import PosterUploader from "./Poster/PosterUploader";
import PlaceInput from "./Place/PlaceInput";
import ArtistInputContainer from "./Artist/ArtistInputContainer";
import GoodsInputContainer from "./Goods/GoodsInputContainer";
import HashTagsContainer from "./HashTags/HashTagsContainer";
import DateRangeInput from "./DateRange/DateRangeInput";
import Modal from "../../shared/components/Modal";
import FcfsGoodsInput from "./FcfsGoods/FcfsGoodsInput";
import LuckyDrawInput from "./LuckyDraw/LuckyDrawInput";

type EntryProps = {
	isModalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
	handleSubmit: () => void;
	resetAllStates: () => void;
};

const Entry = ({ isModalOpen, setModalOpen, setBottomSheetOpen, handleSubmit, resetAllStates }: EntryProps) => {
	const navigate = useNavigate();

	const [basicInputs, setBasicInputs] = useRecoilState(requestBasicAtom);
	const { organizer, snsId, link } = basicInputs;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setBasicInputs({
			...basicInputs,
			[id]: e.currentTarget.value,
		});
	};

	const handleInputDelete = (e: React.MouseEvent, id: string) => {
		setBasicInputs((prev) => ({
			...prev,
			[id]: "",
		}));
	};

	const handleClickModalContinue = () => {
		resetAllStates();
		setModalOpen(false);
		setBottomSheetOpen(false);
	};

	const handleClickModalFinish = () => {
		navigate("/");
		setModalOpen(false);
		setBottomSheetOpen(false);
	};

	return (
		<>
			<StyledEntry>
				<div className="notice">
					<p>장소 등록 시 주의사항</p>
					<p>
						오늘의 컵홀더는 특전 증정이 있는 이벤트에 한해 정보를 제공합니다.
						<b> 따라서 특전 증정이 없는 포토부스, 옥외광고 등의 이벤트는 승인되지 않습니다.</b>
					</p>
				</div>

				<div className="inputsWrapper">
					<PlaceInput />
					<ArtistInputContainer />
					<BasicInput
						label="주최자 닉네임"
						value={organizer}
						id="organizer"
						placeholder="오늘의 컵홀더"
						handleInputChange={(e) => handleInputChange(e, "organizer")}
						handleInputDelete={(e) => handleInputDelete(e, "organizer")}
					/>
					<BasicInput
						label="주최자 트위터 계정"
						value={snsId}
						id="snsId"
						placeholder="ocup"
						handleInputChange={(e) => handleInputChange(e, "snsId")}
						handleInputDelete={(e) => handleInputDelete(e, "snsId")}
					/>
					<DateRangeInput />
					<PosterUploader />
					<HashTagsContainer />
					<BasicInput
						label="이벤트 트윗 링크"
						value={link}
						id="link"
						placeholder="이벤트 정보가 담긴 트윗 링크를 남겨주세요."
						handleInputChange={(e) => handleInputChange(e, "link")}
						handleInputDelete={(e) => handleInputDelete(e, "link")}
					/>
					<FcfsGoodsInput />
					<GoodsInputContainer />
					<LuckyDrawInput />
				</div>

				<div className="ctaContainer">
					<Button customStyle={{ width: "100%", fontWeight: "bold" }} handleClick={() => setBottomSheetOpen(true)}>
						미리보기
					</Button>
					<Button customStyle={{ width: "100%", fontWeight: "bold" }} handleClick={handleSubmit}>
						제출하기
					</Button>
				</div>
			</StyledEntry>

			{isModalOpen && (
				<Modal>
					<StyledRequestModal>
						<h4>제출 완료!</h4>
						<p>내용 검토 후 1-4일 이내 업로드 됩니다.</p>
						<div className="modalBtnContainer">
							<button type="button" onClick={handleClickModalContinue}>다른 카페 등록하기</button>
							<button type="button" onClick={handleClickModalFinish}>메인으로 돌아가기</button>
						</div>
					</StyledRequestModal>
				</Modal>
			)}
		</>
	);
};

export default Entry;
