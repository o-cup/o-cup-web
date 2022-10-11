import React from "react";
import { useRecoilState } from "recoil";
import { Icon } from "../../../shared/components";
import { requestInputsAtom } from "../../../shared/state";
import BasicInput from "../units/BasicInput";
import { StyledHashTagsInputsContainer } from "./hashTagsStyle";

const HashTagsContainer = () => {
	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
	const { hashTags } = requestInputs;

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		hashTagId: number
	) => {
		const { value } = e.currentTarget;
		const addDash = value.replace(/\s+/g, "_");

		const hashTagsData = hashTags.map((tag) => {
			if (tag.id === hashTagId) {
				return {
					...tag,
					text: addDash,
				};
			}
			return tag;
		});
		setRequestInputs({
			...requestInputs,
			hashTags: hashTagsData,
		});
	};

	const handleAddHashTag = () => {
		if (hashTags.length > 3) return;
		setRequestInputs({
			...requestInputs,
			hashTags: [
				...hashTags,
				{ id: hashTags[hashTags.length - 1].id + 1, text: "" },
			],
		});
	};

	const handleInputDelete = (e: React.MouseEvent, hashTagId: number) => {
		const hashTagsData = hashTags.map((tag) => {
			if (tag.id === hashTagId) {
				return {
					...tag,
					text: "",
				};
			}
			return tag;
		});
		setRequestInputs({
			...requestInputs,
			hashTags: hashTagsData,
		});
	};

	const handleDeleteHashTag = (hashTagId: number) => {
		const hashTagsData = hashTags.filter((tag) => tag.id !== hashTagId);
		setRequestInputs({
			...requestInputs,
			hashTags: hashTagsData,
		});
	};

	return (
		<StyledHashTagsInputsContainer>
			{hashTags.map((t) => (
				<div key={t.id} className="hashTagsInputs">
					<BasicInput
						label="이벤트 해시태그"
						value={t.text}
						id="hashTag"
						placeholder="해피_오컵_데이"
						handleInputChange={(e) => handleInputChange(e, t.id)}
						handleInputDelete={(e) => handleInputDelete(e, t.id)}
						hideLabel={t.id !== 1}
					/>
					{t.id !== 1 && (
						<Icon
							name="subtraction"
							handleClick={() => handleDeleteHashTag(t.id)}
						/>
					)}
				</div>
			))}
			{hashTags.length < 4 && (
				<div className="iconWrapper">
					<Icon name="plus-circle" handleClick={handleAddHashTag} />
				</div>
			)}
		</StyledHashTagsInputsContainer>
	);
};

export default HashTagsContainer;
