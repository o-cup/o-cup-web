import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fetchDuplicatedEvent } from "../../shared/apis/common";
import { BottomSheet, Button, Layout, Toast } from "../../shared/components";
import {
	requestGoodsListAtom,
	requestInputsAtom,
	tempPostersAtom,
} from "../../shared/state";
import Entry from "./Entry";
import PreviewContent from "./PreviewContent";
import CategoryInput from "./categoryInput";
import DateRangeInput from "./dateRange/DateRangeInput";
import AlertModal from "./modals/AlertModal";
import ConfirmModal from "./modals/ConfirmModal";
import DuplicatedModal from "./modals/DuplicatedModal";
import SubmitModal from "./modals/SubmitModal";
import PlaceInput from "./place/PlaceInput";
import { sendReqData } from "./requestApi";
import {
	StyledCheckEvent,
	StyledPreview,
	StyledRequest,
	StyledRequestBottomSheet,
} from "./requestStyle";
import type { EventType } from "../../shared/types";

const Request = () => {
	const router = useRouter();

	const [isLoading, setLoading] = useState(false);
	const [isChecked, setChecked] = useState(false); // 페이지 라우팅 역할
	const [isDuplicatedEventOpen, setDuplicatedEventOpen] = useState(false);
	const [duplicatedEventData, setDuplicatedEventData] = useState(
		{} as EventType
	); // 중복 이벤트 정보

	const [isToast, setToast] = useState(false);
	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
	const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
	const [isAlertOpen, setAlertOpen] = useState(false);
	const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
	const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);
	const [tempPosters, setTempPosters] = useRecoilState(tempPostersAtom);

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

	const resetAllStates = () => {
		setRequestInputs({
			place: { place: "", address: "", districts: { code: "", name: "" } },
			category: "",
			artist: [{ id: 1, peopleId: 0, bias: "", team: "" }],
			organizer: "",
			snsId: "",
			link: "",
			posterUrls: [{ id: 1, publicUrl: "" }],
			hashTags: [{ id: 1, text: "" }],
			dateRange: { startAt: "", endAt: "" },
			goods: {},
		});
		setGoodsList([
			{
				id: 1,
				key: "",
				title: "",
				items: [{ id: 1, text: "" }],
			},
		]);
		setTempPosters([{ id: 1, file: null, result: "" }]);
		setChecked(false);
		setDuplicatedEventOpen(false);
		setDuplicatedEventData({} as EventType);
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

	useEffect(() => {
		window.scrollTo(0, 0);

		return () => {
			// 이벤트 등록 session 정보 초기화
			resetAllStates();
			sessionStorage.clear();
		};
	}, []);

	// 중복 확인하기
	const checkDuplicate = () => {
		// 포토부스 선택 시 중복검사 패스
		if (requestInputs.category === "D") {
			window.scrollTo(0, 0);
			setChecked(true);
		} else {
			fetchDuplicatedEvent({
				place: requestInputs.place.place,
				dateRange: requestInputs.dateRange,
			}).then((res) => {
				if (res) {
					setDuplicatedEventOpen(true);
					setDuplicatedEventData(res);
				} else {
					// 중복검사 통과
					window.scrollTo(0, 0);
					setChecked(true);
					setToast(true);
				}
			});
		}
	};

	if (!isChecked) {
		return (
			<>
				<Layout page="duplicate">
					<StyledRequest>
						<StyledCheckEvent>
							<div className="checkNotice">
								<img src="/images/pin.png" alt="pin" />
								<p>
									이미 등록된 이벤트일 수도 있어요.
									<br />
									이벤트 등록 전, 중복 확인 먼저 해주세요.
								</p>
							</div>
							<CategoryInput />
							<PlaceInput />
							<DateRangeInput />
							<div
								className={`btnContainer ${
									requestInputs.place.place &&
									requestInputs.dateRange.startAt &&
									requestInputs.dateRange.endAt &&
									requestInputs.category
										? ""
										: "disabled"
								}`}
							>
								<Button
									customStyle={{
										width: "100%",
										fontWeight: "bold",
										marginTop: "32px",
									}}
									handleClick={checkDuplicate}
								>
									중복 확인하기
								</Button>
							</div>
						</StyledCheckEvent>
					</StyledRequest>
				</Layout>

				{isDuplicatedEventOpen && (
					<DuplicatedModal
						duplicatedEventData={duplicatedEventData}
						resetAllStates={resetAllStates}
					/>
				)}
			</>
		);
	}
	return (
		<>
			<Layout page="request" handleBackClick={() => setChecked(false)}>
				<StyledRequest>
					<Entry
						setConfirmModalOpen={setConfirmModalOpen}
						setBottomSheetOpen={setBottomSheetOpen}
					/>
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

			{/* {isMobile && ( */}
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
			{/* )} */}
		</>
	);
};

export default Request;
