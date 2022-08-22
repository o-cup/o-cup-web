import React from "react";
import { StyledSearchInput, InputWrapper, Label } from "./styles/searchInputStyle";

export type InputProps = {
	value: string;
	label: string;
	id: string;
	placeholder: string;
	handleClickSearchBtn?: (e: any) => void;
	hideLabel?: boolean;
	hideButton?: boolean;
};

const SearchInput = ({
	value,
	label,
	id,
	placeholder,
	handleClickSearchBtn,
	hideLabel = false,
	hideButton = false,
}: InputProps) => (
	<StyledSearchInput>
		{!hideLabel && <Label htmlFor={id}>{label}</Label>}
		<InputWrapper>
			<input disabled type="text" value={value} id={id} placeholder={placeholder} />
			{!hideButton && (
				<button type="button" onClick={handleClickSearchBtn}>
					검색
				</button>
			)}
		</InputWrapper>
	</StyledSearchInput>
);

SearchInput.defaultProps = {
	handleClickSearchBtn: () => console.log("click"),
	hideLabel: false,
	hideButton: false,
};

export default SearchInput;
