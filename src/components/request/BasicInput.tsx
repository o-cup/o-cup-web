import React from "react";
import { Label, StyledBasicInput } from "./styles/basicInputStyle";

export type InputProps = {
	value: string;
	label: string;
	id: string;
	placeholder: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	hideLabel?: boolean;
};

const BasicInput = ({ value, label, id, placeholder, handleInputChange, hideLabel = false }: InputProps) => (
	<StyledBasicInput>
		<Label htmlFor={id} hideLabel={hideLabel}>
			{!hideLabel && label}
		</Label>
		<div className={`inputWrapper ${id}`}>
			<input type="text" value={value} id={id} placeholder={placeholder} onChange={handleInputChange} className={id} />
		</div>
	</StyledBasicInput>
);

BasicInput.defaultProps = {
	hideLabel: false,
};

export default BasicInput;
