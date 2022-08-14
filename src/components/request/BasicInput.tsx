import React from "react";
import { Input, Label, StyledBasicInput } from "./styles/basicInputStyle";

export type InputProps = {
	value: string;
	label: string;
	id: string;
	placeholder: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BasicInput = ({ value, label, id, placeholder, handleInputChange }: InputProps) => (
	<StyledBasicInput>
		<Label htmlFor={id} isSnsId={id === "snsId"} isHashTag={id === "hashTag"}>
			{label}
		</Label>
		<Input
			type="text"
			value={value}
			id={id}
			placeholder={placeholder}
			isSnsId={id === "snsId"}
			isHashTag={id === "hashTag"}
			onChange={handleInputChange}
		/>
	</StyledBasicInput>
);

export default BasicInput;
