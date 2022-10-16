import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "../../shared/components";
import { requestInputsAtom } from "../../shared/state";
import ArtistInputContainer from "./Artist/ArtistInputContainer";
// import DateRangeInput from "./DateRange/DateRangeInput";
import FcfsGoodsInput from "./FcfsGoods/FcfsGoodsInput";
import GoodsInputContainer from "./Goods/GoodsInputContainer";
import HashTagsContainer from "./HashTags/HashTagsContainer";
import LuckyDrawInput from "./LuckyDraw/LuckyDrawInput";
import { StyledPlaceInput } from "./Place/placeInputStyle";
import PosterUploader from "./Poster/PosterUploader";
import { StyledEntry } from "./requestStyle";
import BasicInput from "./units/BasicInput";
import SearchInput from "./units/SearchInput";
import type { Dispatch, SetStateAction } from "react";

type EntryProps = {
	setConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
	setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const Entry = ({ setConfirmModalOpen, setBottomSheetOpen }: EntryProps) => {
	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
	const { organizer, snsId, link } = requestInputs;

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => {
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
			<div className="inputsWrapper">
				<StyledPlaceInput>
					<SearchInput
						value={requestInputs.place.place}
						id="place"
						placeholder="장소이름"
						label="장소 *"
						hideButton
					/>
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
				{/* <DateRangeInput disabled /> */}
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
				<Button
					customStyle={{ width: "100%", fontWeight: "bold" }}
					handleClick={() => setBottomSheetOpen(true)}
				>
					미리보기
				</Button>
				<Button
					customStyle={{ width: "100%", fontWeight: "bold" }}
					handleClick={() => setConfirmModalOpen(true)}
				>
					제출하기
				</Button>
			</div>
		</StyledEntry>
	);
};

export default React.memo(Entry);
