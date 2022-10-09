import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchPeople } from "../../../../shared/apis/common";
import { Icon } from "../../../../shared/components";
import SearchInput from "../units/SearchInput";
import { DeleteBtn } from "../units/basicInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "../units/searchListStyle";
import { StyledArtistInput } from "./artistInputStyle";
import type { PeopleType } from "../../../../shared/types";
import type { RequestArtistType } from "../../../../shared/types/request";

type InputProps = {
	value: RequestArtistType;
	handleChangeArtist: (peopleId: number, bias: string, team: string, index: number) => void;
	handleDeleteArtist: (artistId: number) => void;
};

const ArtistInput = ({ value, handleChangeArtist, handleDeleteArtist }: InputProps) => {
	const resultString = value.bias ? `${value.bias}${value.team ? ` (${value.team})` : ""}` : "";

	const [isSearchOpen, setSearchOpen] = useState(false);
	const [keyword, setKeyword] = useState(""); // 검색 키워드

	const [isInputOpen, setInputOpen] = useState(false);
	const [customArtist, setCustomArtist] = useState({
		bias: "",
		team: "",
	});

	const { data: people } = useQuery(["people"], () => fetchPeople(), {
		select: (data) =>
			data?.filter((item) =>
				`${item.name} ${item.enName || ""} ${item.koName || ""} ${item.realName || ""}  ${
					item.team?.join() || ""
				}`.includes(keyword)
			),
	});

	const handleClickSelect = (biasInfo: PeopleType) => {
		handleChangeArtist(biasInfo.id, biasInfo.name, biasInfo.team?.join(", ") || "", value.id);
		setKeyword("");
		setSearchOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomArtist({
			...customArtist,
			[e.target.id]: e.target.value,
		});
	};

	const handleInputDelete = (e: React.MouseEvent, id: string) => {
		setCustomArtist((prev) => ({
			...prev,
			[id]: "",
		}));
	};

	const handleConfirmCustomInput = () => {
		handleChangeArtist(0, customArtist.bias, customArtist.team, value.id);
		setInputOpen(false);
	};

	return (
		<StyledArtistInput>
			<div className="artistInputContainer">
				<SearchInput
					value={resultString}
					handleClickSearchBtn={() => {
						setSearchOpen(!isSearchOpen);
						setInputOpen(false);
					}}
					id="artist"
					placeholder="아티스트 이름"
					label="아티스트 이름 *"
					hideLabel={value.id > 1}
					shortBtn={value.id > 1}
				/>
				{value.id !== 1 && <Icon name="subtraction" handleClick={() => handleDeleteArtist(value.id)} />}
			</div>

			{isSearchOpen && (
				<StyledSearchListContainer>
					<div className="inputContainer">
						<input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
						<div className="buttonContainer">
							<FaTimes onClick={() => setKeyword("")} />
							<FaSearch />
						</div>
					</div>
					<StyledSearchList>
						{people?.map((bias) => (
							<li key={bias.id}>
								<div>
									<p>
										{bias.name}
										{bias.team ? ` (${bias.team?.join(", ")})` : ""}
									</p>
								</div>
								<button type="button" onClick={() => handleClickSelect(bias)}>
									선택
								</button>
							</li>
						))}
						<li>
							<div>
								<p>직접 입력하기</p>
							</div>
							<button
								type="button"
								onClick={() => {
									setSearchOpen(false);
									setInputOpen(true);
								}}
							>
								선택
							</button>
						</li>
					</StyledSearchList>
				</StyledSearchListContainer>
			)}

			{isInputOpen && (
				<div className="customInputContainer">
					<div className="customInputs">
						<div>
							<input id="bias" value={customArtist.bias} placeholder="아티스트 (한글명)" onChange={handleInputChange} />
							{!!customArtist.bias && <DeleteBtn onClick={(e) => handleInputDelete(e, "bias")} />}
						</div>
						<div>
							<input
								id="team"
								value={customArtist.team}
								placeholder="소속 그룹 (한글명, 선택사항)"
								onChange={handleInputChange}
							/>
							{!!customArtist.team && <DeleteBtn onClick={(e) => handleInputDelete(e, "team")} />}
						</div>
					</div>
					<div className="customConfirm">
						<input
							value={customArtist.team ? `${customArtist.bias} (${customArtist.team})` : customArtist.bias}
							disabled
						/>
						<button type="button" onClick={handleConfirmCustomInput}>
							입력완료
						</button>
					</div>
				</div>
			)}
		</StyledArtistInput>
	);
};

export default React.memo(ArtistInput);
