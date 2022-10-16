import React, { useState } from "react";
import {
	StyledGoodsInput,
	StyledInputWrapper,
	StyledChipContainer,
} from "./goodsInputStyle";
import GoodsChipInput from "../GoodsChipInput/GoodsChipInput";
import Icon from "../../../shared/components/icon";
import { ItemsType } from "../../../shared/types/request";
import GoodsSelectBox from "./GoodsSelectBox";

type GoodsListValues = {
	id: number;
	key: string;
	title: string;
	items: ItemsType[];
};

type InputProps = {
	value: GoodsListValues;
	handleChangeGoods: (
		index: number,
		title: string,
		items: ItemsType[],
		key?: string
	) => void;
};

type OptionsType = {
	key: string;
	value: string;
	help: string;
};

const GoodsInput = ({ value, handleChangeGoods }: InputProps) => {
	const [isSelectOpen, setSelectOpen] = useState(false);
	const [isDirectInputOpen, setDirectInputOpen] = useState(false);

	/** 특전 제목 변경 */
	const setGoodsTitle = (title: string, key?: string) => {
		handleChangeGoods(value.id, title, value.items, key);
	};

	/* select box 클릭으로 변경 */
	const handleSelectTitle = (item: OptionsType) => {
		setGoodsTitle(item.value, item.key);
		setSelectOpen(false);
	};

	/* select box -> direct input */
	const handleSelectDirectInput = () => {
		setGoodsTitle("", "");
		setSelectOpen(false);
		setDirectInputOpen(true);
	};

	/* direct input -> select box */
	const handleClickSearch = () => {
		setGoodsTitle("", "");
		setSelectOpen(true);
		setDirectInputOpen(false);
	};

	/** 특전 목록 변경 */
	const setGoodsContent = (text: string, index: number) => {
		const goodsData = value.items.map((g) => {
			if (g.id === index) {
				return { ...g, text };
			}
			return g;
		});
		handleChangeGoods(value.id, value.title, goodsData);
	};

	const addGoodsContent = () => {
		const id = (value.items[value.items.length - 1]?.id || 0) + 1;
		const goodsData = [
			...value.items,
			{
				id,
				text: "",
			},
		];
		handleChangeGoods(value.id, value.title, goodsData);
	};

	const deleteGoodsChip = (index: number) => {
		const goodsData = value.items.filter((g) => g.id !== index);
		handleChangeGoods(value.id, value.title, goodsData);
	};

	return (
		<StyledGoodsInput>
			{isDirectInputOpen ? (
				<StyledInputWrapper>
					<input
						value={value.title}
						placeholder="특전 종류를 입력해주세요. (예: 마카롱특전)"
						onChange={(e) => setGoodsTitle(e.target.value, "")}
					/>
					<div className="iconContainer">
						{value.title !== "" && (
							<Icon name="delete" handleClick={() => setGoodsTitle("", "")} />
						)}
						<Icon name="search" handleClick={handleClickSearch} />
					</div>
				</StyledInputWrapper>
			) : (
				<GoodsSelectBox
					value={value}
					isSelectOpen={isSelectOpen}
					setSelectOpen={setSelectOpen}
					handleSelectTitle={handleSelectTitle}
					handleSelectDirectInput={handleSelectDirectInput}
				/>
			)}

			<StyledChipContainer>
				{value.items.map((g) => (
					<GoodsChipInput
						key={g.id}
						index={g.id}
						value={g.text}
						handleChange={setGoodsContent}
						handleDelete={deleteGoodsChip}
					/>
				))}
				<button
					type="button"
					className="chipAddButton"
					onClick={addGoodsContent}
				>
					<i className="plus" />
				</button>
			</StyledChipContainer>
		</StyledGoodsInput>
	);
};

export default GoodsInput;
