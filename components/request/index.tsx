import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
	requestGoodsListAtom,
	requestInputsAtom,
	tempPostersAtom,
} from "../../shared/state";
import CheckPage from "./CheckPage";

const FormPage = dynamic(import("./FormPage"));

const Request = () => {
	const [isChecked, setChecked] = useState(false); // 페이지 라우팅 역할
	const [isToast, setToast] = useState(false);

	const setRequestInputs = useSetRecoilState(requestInputsAtom);
	const setGoodsList = useSetRecoilState(requestGoodsListAtom);
	const setTempPosters = useSetRecoilState(tempPostersAtom);

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
	};

	useEffect(() => {
		window.scrollTo(0, 0);

		return () => {
			// 이벤트 등록 session 정보 초기화
			resetAllStates();
			sessionStorage.clear();
		};
	}, []);

	if (!isChecked) {
		return (
			<CheckPage
				resetAllStates={resetAllStates}
				setChecked={setChecked}
				setToast={setToast}
			/>
		);
	}
	return (
		<FormPage
			resetAllStates={resetAllStates}
			setChecked={setChecked}
			isToast={isToast}
			setToast={setToast}
		/>
	);
};

export default Request;
