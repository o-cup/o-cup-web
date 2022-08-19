import React from "react";
import { DeleteBtn, InputWrapper, StyledBasicInput } from "./styles/basicInputStyle";
import { Label } from "./styles/requestStyle";

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
		<Label htmlFor={id} hideLabel={hideLabel}>
			{!hideLabel && label}
		</Label>
		<InputWrapper className={`inputWrapper ${id}`} hasValue={!!value}>
			<input type="text" value={value} id={id} placeholder={placeholder} onChange={handleInputChange} className={id} />
			{!!value && <DeleteBtn onClick={handleInputDelete} />}
		</InputWrapper>
	</StyledBasicInput>
);

BasicInput.defaultProps = {
	hideLabel: false,
};

export default BasicInput;
