import React from "react";
import { Label } from "../requestStyle";
import { DeleteBtn, InputWrapper, StyledBasicInput } from "./basicInputStyle";

export type InputProps = {
	value: string;
	label: string;
	id: string;
	placeholder: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	hideLabel?: boolean;
	handleInputDelete: (e: React.MouseEvent) => void;
};

const BasicInput = ({
	value,
	handleInputDelete,
	label,
	id,
	placeholder,
	handleInputChange,
	hideLabel = false,
}: InputProps) => (
	<StyledBasicInput>
		{!hideLabel && <Label htmlFor={id}>{label}</Label>}
		<InputWrapper className={`inputWrapper ${id}`} hasValue={!!value}>
			<input
				type="text"
				value={value}
				id={id}
				placeholder={placeholder}
				onChange={handleInputChange}
				className={id}
			/>
			{!!value && <DeleteBtn onClick={handleInputDelete} />}
		</InputWrapper>
	</StyledBasicInput>
);

BasicInput.defaultProps = {
	hideLabel: false,
};

export default BasicInput;
