import React, { Dispatch, SetStateAction } from "react";
import "./bottomSheet.css";

import { BottomSheet as RBottomSheet } from "react-spring-bottom-sheet";
import "./react-spring-bottom-sheet.css";
import Icon from "../Icon/Icons";

type ButtonContent = {
	title: string;
	handleClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
};

type BottomSheetProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	header?: string;
	close?: boolean;
	slider?: boolean;
	buttons?: ButtonContent;
	children: JSX.Element;
};

export default function BottomSheet({ open, setOpen, header, close, slider, buttons, children }: BottomSheetProps) {
	function onDismiss() {
		setOpen(false);
		return false;
	}

	return (
		<RBottomSheet
			open={open}
			onDismiss={() => onDismiss()}
			header={
				<div className={`bottom-header ${slider ? "slider" : ""}`}>
					{header && <p className="title">{header}</p>}
					{close && (
						<button
							type="button"
							className="close"
							onClick={() => {
								setOpen(false);
							}}
						>
							<Icon name="delete-circle-black" />
						</button>
					)}
				</div>
			}
			footer={
				<div className="bottom-footer">
					{buttons ? (
						<button type="button" onClick={buttons.handleClick}>
							{buttons.title}
						</button>
					) : (
						""
					)}
				</div>
			}
			initialFocusRef={false}
			snapPoints={({ headerHeight, minHeight }) => [headerHeight + minHeight]}
		>
			{children}
		</RBottomSheet>
	);
}

BottomSheet.defaultProps = {
	header: "",
	close: false,
	slider: false,
	buttons: {
		title: "",
		handleClick: () => console.log("click!"),
	},
};
