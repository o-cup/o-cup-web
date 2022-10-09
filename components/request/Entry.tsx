import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../state/atoms";
import { StyledEntry } from "./styles/requestStyle";
import { StyledPlaceInput } from "./Place/placeInputStyle";
import Button from "../../shared/components/Button";
import BasicInput from "./units/BasicInput";
import PosterUploader from "./Poster/PosterUploader";
import PlaceInput from "./Place/PlaceInput";
import ArtistInputContainer from "./Artist/ArtistInputContainer";
import GoodsInputContainer from "./Goods/GoodsInputContainer";
import HashTagsContainer from "./HashTags/HashTagsContainer";
import DateRangeInput from "./DateRange/DateRangeInput";
import FcfsGoodsInput from "./FcfsGoods/FcfsGoodsInput";
import LuckyDrawInput from "./LuckyDraw/LuckyDrawInput";
import SearchInput from "./units/SearchInput";

type EntryProps = {
	setConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
	setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const Entry = ({ setConfirmModalOpen, setBottomSheetOpen }: EntryProps) => {
	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
	const { organizer, snsId, link } = requestInputs;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setRequestInputs({
			...requestInputs,
			[id]: e.currentTarget.value,
		});
	};

	const handleInputDelete = (e: React.MouseEvent, id: string) => {
		setRequestInputs((prev) => ({
			...prev,
			[id]: "",
		}));
	};

	return (
		<StyledEntry>
			<div className="notice">
				<p>이벤트 등록 시 주의사항</p>
				<p>
					오늘의 컵홀더는 특전 증정이 있는 이벤트에 한해 정보를 제공합니다.
					<b> 따라서 특전 증정이 없는 포토부스, 옥외광고 등의 이벤트는 승인되지 않습니다.</b>
				</p>
			</div>
			<div className="inputsWrapper">
				<StyledPlaceInput>
					<SearchInput value={requestInputs.place.place} id="place" placeholder="장소이름" label="장소 *" hideButton />
					<SearchInput
						value={requestInputs.place.address}
						id="address"
						placeholder="주소"
						label=""
						hideLabel
						hideButton
					/>
				</StyledPlaceInput>
				<ArtistInputContainer />
				<BasicInput
					label="주최자 닉네임 *"
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
				<DateRangeInput disabled />
				<PosterUploader />
				<HashTagsContainer />
				<BasicInput
					label="이벤트 트윗 링크 *"
					value={link}
					id="link"
					placeholder="이벤트 정보가 담긴 트윗(또는 게시글) 링크를 남겨주세요."
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
				<Button customStyle={{ width: "100%", fontWeight: "bold" }} handleClick={() => setConfirmModalOpen(true)}>
					제출하기
				</Button>
			</div>
		</StyledEntry>
	);
};

export default React.memo(Entry);
