import React from "react";
import { StyledSearchInput, InputWrapper, Label } from "./searchInputStyle";

export type InputProps = {
	value: string;
	label: string;
	id: string;
	placeholder: string;
	handleClickSearchBtn?: (e: React.FormEvent<HTMLButtonElement>) => void;
	hideLabel?: boolean;
	hideButton?: boolean;
	shortBtn?: boolean;
};

const SearchInput = ({
	value,
	label,
	id,
	placeholder,
	handleClickSearchBtn,
	hideLabel = false,
	hideButton = false,
	shortBtn = false,
}: InputProps) => (
	<StyledSearchInput>
		{!hideLabel && <Label htmlFor={id}>{label}</Label>}
		<InputWrapper>
			<input
				disabled
				type="text"
				value={value}
				id={id}
				placeholder={placeholder}
			/>
			{!hideButton && (
				<button
					type="button"
					onClick={handleClickSearchBtn}
					className={shortBtn ? "shortBtn" : ""}
				>
					검색
				</button>
			)}
		</InputWrapper>
	</StyledSearchInput>
);

SearchInput.defaultProps = {
	handleClickSearchBtn: () => null,
	hideLabel: false,
	hideButton: false,
	shortBtn: false,
};

export default SearchInput;
