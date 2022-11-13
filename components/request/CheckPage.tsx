/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { fetchDuplicatedEvent } from "../../shared/apis/common";
import { Button, Layout } from "../../shared/components";
import { requestInputsAtom } from "../../shared/state";
import CategoryInput from "./categoryInput";
import DateRangeInput from "./dateRange/DateRangeInput";
import { DuplicatedModal } from "./modals";
import PlaceInput from "./place/PlaceInput";
import { StyledCheckEvent, StyledRequest } from "./requestStyle";
import type { EventType } from "../../shared/types";
import type { Dispatch, SetStateAction } from "react";

const KakaoAxios = axios.create({
	baseURL: "//dapi.kakao.com",
	headers: {
		Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
	},
});

// 법정동 코드 검색
const bCodeSearch = (params: { query: string }) =>
	KakaoAxios.get("/v2/local/search/address.json", { params });

type CheckPageProps = {
	resetAllStates: () => void;
	setChecked: Dispatch<SetStateAction<boolean>>;
	setToast: Dispatch<SetStateAction<boolean>>;
};

const CheckPage = ({
	resetAllStates,
	setChecked,
	setToast,
}: CheckPageProps) => {
	const [isDuplicatedEventOpen, setDuplicatedEventOpen] = useState(false);
	const [duplicatedEventData, setDuplicatedEventData] = useState(
		{} as EventType
	); // 중복 이벤트 정보

	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);

	// 중복 확인하기
	const checkDuplicate = () => {
		if (requestInputs.category === "D") {
			// 포토부스 선택 시 중복검사 패스
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

		// 법정동코드 찾기
		bCodeSearch({ query: requestInputs.place.address }).then((res) => {
			if (res.data) {
				setRequestInputs({
					...requestInputs,
					place: {
						...requestInputs.place,
						districts: {
							...requestInputs.place.districts,
							code: res.data.documents[0].address.b_code,
						},
					},
				});
			}
		});
	};

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
					resetAllStates={() => {
						resetAllStates();
						setDuplicatedEventOpen(false);
						setDuplicatedEventData({} as EventType);
					}}
				/>
			)}
		</>
	);
};

export default CheckPage;
