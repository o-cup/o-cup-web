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
import { resetReqData, sendReqData } from "../components/request/requestApi";

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

  const handleSubmit = () =>
    sendReqData({
      placeInputs, organizer, snsId, dateRange, posterUrls, artistInputs, hashTags, goodsList, link, setModalOpen,
    });

  const resetAllStates = () =>
    resetReqData({
      setPlaceInputs, setArtistInputs, setBasicInputs, setPosterUrls, setHashTags, setDateRange, setGoodsList,
    });

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
