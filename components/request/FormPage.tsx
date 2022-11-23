import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Layout, Toast } from "../../shared/components";
import {
	requestGoodsListAtom,
	requestInputsAtom,
	tempPostersAtom,
} from "../../shared/state";
import ArtistInputContainer from "./artist/ArtistInputContainer";
import DateRangeInput from "./dateRange/DateRangeInput";
import FcfsGoodsInput from "./fcfsGoods/FcfsGoodsInput";
import GoodsInputContainer from "./goods/GoodsInputContainer";
import HashTagsContainer from "./hashTags/HashTagsContainer";
import LuckyDrawInput from "./luckyDraw/LuckyDrawInput";
import { AlertModal, ConfirmModal, SubmitModal } from "./modals";
import { StyledPlaceInput } from "./place/placeInputStyle";
import PosterUploader from "./poster/PosterUploader";
import { sendReqData } from "./requestApi";
import {
	StyledEntry,
	StyledPreview,
	StyledRequest,
	StyledRequestBottomSheet,
} from "./requestStyle";
import BasicInput from "./units/BasicInput";
import SearchInput from "./units/SearchInput";
import type { Dispatch, SetStateAction } from "react";

const BottomSheet = dynamic(import("../../shared/components/bottomSheet"));
const PreviewContent = dynamic(import("./PreviewContent"));

type FormPageProps = {
	resetAllStates: () => void;
	setChecked: Dispatch<SetStateAction<boolean>>;
	isToast: boolean;
	setToast: Dispatch<SetStateAction<boolean>>;
};

const FormPage = ({
	resetAllStates,
	setChecked,
	isToast,
	setToast,
}: FormPageProps) => {
	const router = useRouter();

	const [isLoading, setLoading] = useState(false);

	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
	const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
	const [isAlertOpen, setAlertOpen] = useState(false);
	const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
	const goodsList = useRecoilValue(requestGoodsListAtom);
	const tempPosters = useRecoilValue(tempPostersAtom);
	const { organizer, snsId, link } = requestInputs;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

	const handleSubmit = () => {
		setLoading(true);
		sendReqData({
			requestInputs,
			goodsList,
			tempPosters,
			setSubmitModalOpen,
			setConfirmModalOpen,
			setAlertOpen,
			setLoading,
		});
	};

	const handleClickContinue = () => {
		resetAllStates();
		setSubmitModalOpen(false);
		setBottomSheetOpen(false);
		window.scrollTo(0, 0);
	};

	const handleClickFinish = () => {
		router.push("/");
		setChecked(false);
		setSubmitModalOpen(false);
		setBottomSheetOpen(false);
	};

	return (
		<>
			<Layout page="request" handleBackClick={() => setChecked(false)}>
				<StyledRequest>
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
					<StyledPreview>
						<PreviewContent />
					</StyledPreview>
				</StyledRequest>
			</Layout>

			{isToast && (
				<Toast
					setToast={setToast}
					text={`아직 해당 장소, 해당 날짜로 등록된 이벤트가 없어요.${"\n"}아래에서 등록하고자 하는 이벤트 정보를 입력해 주세요.`}
				/>
			)}

			{isConfirmModalOpen && (
				<ConfirmModal
					isLoading={isLoading}
					setConfirmModalOpen={setConfirmModalOpen}
					handleSubmit={handleSubmit}
				/>
			)}

			{isSubmitModalOpen && (
				<SubmitModal
					handleClickContinue={handleClickContinue}
					handleClickFinish={handleClickFinish}
				/>
			)}

			{isAlertOpen && <AlertModal setAlertOpen={setAlertOpen} />}

			<BottomSheet
				open={isBottomSheetOpen}
				setOpen={setBottomSheetOpen}
				header="미리보기"
				close
				slider
				buttons={{
					title: "제출하기",
					handleClick: () => setConfirmModalOpen(true),
				}}
			>
				<StyledRequestBottomSheet>
					<PreviewContent />
				</StyledRequestBottomSheet>
			</BottomSheet>
		</>
	);
};

export default FormPage;
