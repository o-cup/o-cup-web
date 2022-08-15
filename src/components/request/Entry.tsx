import React, { useState } from "react";
import Button from "../../shared/components/Button";
import Icon from "../../shared/components/Icon/Icons";
import BasicInput from "./BasicInput";
import { StyledEntry } from "./styles/requestStyle";
import PlaceInput from "./PlaceInput";
import ArtistInput from "./ArtistInput";

const Entry = () => {
	const [placeInputs, setPlaceInputs] = useState({
		place: "",
		district: "",
		address: ""
	})
	const [artistInputs, setArtistInputs] = useState([{
		id: 1,
		bias: "",
		team: ""
	}])
	const [basicInputs, setBasicInputs] = useState({ organizer: "", snsId: "", link: "" });
	const { organizer, snsId, link } = basicInputs;
	const [hashTags, setHashTags] = useState([{ id: 1, text: "" }]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, hashTagId?: number) => {
		const { value } = e.currentTarget;

		if (id === "hashTag") {
			// TODO: 띄어쓰기 입력 시 자동으로 _ 입력되도록 구현 검토
			const hashTagsData = hashTags.map((tag) => {
				if (tag.id === hashTagId) {
					return {
						...tag,
						text: value,
					};
				}
				return tag;
			});
			setHashTags(hashTagsData);
			return;
		}

		setBasicInputs({
			...basicInputs,
			[id]: e.currentTarget.value,
		});
	};

	const handleAddHashTag = () => {
		if (hashTags.length > 3) return;
		setHashTags((prev) => [...prev, { id: hashTags.length + 1, text: "" }]);
	};

	const handleInputDelete = (e: React.MouseEvent, id: string, hashTagId?: number) => {
		if (id === "hashTag") {
			const hashTagsData = hashTags.map((tag) => {
				if (tag.id === hashTagId) {
					return {
						...tag,
						text: "",
					};
				}
				return tag;
			});
			setHashTags(hashTagsData);
			return;
		}

		setBasicInputs((prev) => ({
			...prev,
			[id]: "",
		}));
	};

	const handleChangeArtist = (bias: string, team: string, index: number) => {
		const artistInputsData = artistInputs.map((artist) => {
			if (artist.id === index) {
				return {
					...artist,
					bias,
					team
				};
			}
			return artist;
		});
		setArtistInputs(artistInputsData);
	}

	const handleClickAddArtist = () => {
		setArtistInputs([
			...artistInputs,
			{
				id: artistInputs.length + 1,
				bias: "",
				team: ""
			}
		])
	};

	return (
		<StyledEntry>
			<div className="notice">
				<p>장소 등록 시 주의사항</p>
				<p>
					오늘의 컵홀더는 특전 증정이 있는 이벤트에 한해 정보를 제공합니다.
					<br />
					따라서 특전이 없는 포토부스, 옥외 광고 등의 이벤트는 승인되지 않습니다.
				</p>
			</div>

			<div className="inputsWrapper">
				<PlaceInput value={placeInputs} setValue={setPlaceInputs}/>
				<div className="artistInputContainer">
					{artistInputs.map((artist) =>
						<ArtistInput key={artist.id} value={artist} handleChangeArtist={handleChangeArtist}/>)}
					<button type="button" onClick={handleClickAddArtist}>다른 아티스트 추가하기</button>
				</div>
				{/* <ArtistInput value={artistInputs} setValue={setArtistInputs}/> */}
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
				<div className="hashTags">
					{hashTags.map((t) => (
						<BasicInput
							key={t.id}
							label="이벤트 해시태그"
							value={t.text}
							id="hashTag"
							placeholder={t.id === 1 ? "해피_오컵_데이" : ""}
							handleInputChange={(e) => handleInputChange(e, "hashTag", t.id)}
							handleInputDelete={(e) => handleInputDelete(e, "hashTag", t.id)}
							hideLabel={t.id !== 1}
						/>
					))}
					<div className="iconWrapper">
						<Icon name="plus-circle" handleClick={handleAddHashTag} />
					</div>
				</div>
				<BasicInput
					label="이벤트 트윗 링크"
					value={link}
					id="link"
					placeholder="이벤트 정보가 담긴 트윗 링크를 남겨주세요."
					handleInputChange={(e) => handleInputChange(e, "link")}
					handleInputDelete={(e) => handleInputDelete(e, "link")}
				/>
			</div>
			<Button customStyle={{ width: "380px", fontWeight: "bold" }}>제출하기</Button>
		</StyledEntry>
	);
};

export default Entry;
