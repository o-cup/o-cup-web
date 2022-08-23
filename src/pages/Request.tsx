import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
	requestArtistsAtom,
	requestBasicAtom,
	requestDateRangeAtom,
	requestGoodsListAtom,
	requestHashTagsAtom,
	requestPlaceAtom,
	requestPosterUrlsAtom,
} from "../state/atoms";
import Layout from "../shared/components/layout";
import Entry from "../components/request/Entry";
import PreviewContent from "../components/request/PreviewContent";
import { StyledPreview, StyledRequest } from "../components/request/styles/requestStyle";
import BottomSheet from "../shared/components/BottomSheet";
import useMediaQuery from "../hooks/useMediaQuery";
import { insertDetail, insertEvent } from "../apis";

// todo: handleSubmit과 resetAllStates 함수 다른 파일에 분리하는 방법 찾아보기
const Request = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 720px)");

	const [placeInputs, setPlaceInputs] = useRecoilState(requestPlaceAtom);
	const [artistInputs, setArtistInputs] = useRecoilState(requestArtistsAtom);
	const [basicInputs, setBasicInputs] = useRecoilState(requestBasicAtom);
	const { organizer, snsId, link } = basicInputs;
	const [posterUrls, setPosterUrls] = useRecoilState(requestPosterUrlsAtom);
	const [hashTags, setHashTags] = useRecoilState(requestHashTagsAtom);
	const [dateRange, setDateRange] = useRecoilState(requestDateRangeAtom);
	const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

	const handleSubmit = async () => {
		// todo: 필수값 비워져 있을 때 경고 팝업 필요
		if (!placeInputs.place) {
			alert("필수값 채워주세요!");
			return;
		}

		const eventParams = {
			place: placeInputs.place,
			organizer,
			snsId,
			district: placeInputs.district,
			startAt: dateRange.startAt,
			endAt: dateRange.endAt,
			images: posterUrls.map((poster) => poster.publicUrl),
			requestedBiases: artistInputs.map((artist) => ({
				peopleId: artist.peopleId,
				bias: artist.bias,
				team: artist.team,
			})),
			isRequested: true,
			isApproved: false,
		};

		const detailParams = {
			// id: 0,
			address: placeInputs.address,
			hashTags: hashTags.map((h) => h.text),
			goods: goodsList.map((goodsObj) => ({
				title: goodsObj.title,
				items: goodsObj.items.map((i) => i.text),
			})),
			tweetUrl: link,
		};

		const eventData = await insertEvent(eventParams);
		if (eventData) {
			await insertDetail({
				id: eventData[0].id,
				...detailParams,
			});
		}

		setModalOpen(true);
	};

	const resetAllStates = () => {
		setPlaceInputs({
			place: "",
			district: "",
			address: "",
		});
		setArtistInputs([
			{
				id: 1,
				peopleId: 0,
				bias: "",
				team: "",
			},
		]);
		setBasicInputs({ organizer: "", snsId: "", link: "" });
		setPosterUrls([{ id: 1, publicUrl: "" }]);
		setHashTags([{ id: 1, text: "" }]);
		setDateRange({
			startAt: "",
			endAt: "",
		});
		setGoodsList([
			{
				id: 1,
				title: "",
				items: [{ id: 1, text: "" }],
			},
		]);
	};

	return (
		<>
			<Layout page="장소 등록">
				<StyledRequest>
					<Entry
						isModalOpen={isModalOpen}
						setModalOpen={setModalOpen}
						setBottomSheetOpen={setBottomSheetOpen}
						handleSubmit={handleSubmit}
						resetAllStates={resetAllStates}
					/>
					<StyledPreview>
						<PreviewContent />
					</StyledPreview>
				</StyledRequest>
			</Layout>
			{isMobile && (
				<BottomSheet
					open={isBottomSheetOpen}
					setOpen={setBottomSheetOpen}
					header="미리보기"
					close
					slider
					buttons={{
						title: "제출하기",
						handleClick: handleSubmit,
					}}
				>
					<div>
						<PreviewContent />
					</div>
				</BottomSheet>
			)}
		</>
	);
};

export default Request;
