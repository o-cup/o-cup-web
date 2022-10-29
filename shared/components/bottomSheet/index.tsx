import React from "react";
import { BottomSheet as RBottomSheet } from "react-spring-bottom-sheet";
import Icon from "../icon";
import type { Dispatch, SetStateAction } from "react";

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
	customHeader?: JSX.Element;
	customButtons?: JSX.Element;
};

function BottomSheet({
	open,
	setOpen,
	header,
	close,
	slider,
	buttons,
	children,
	customHeader,
	customButtons,
}: BottomSheetProps) {
	const onDismiss = () => {
		setOpen(false);
		return false;
	};

	const getHeaderElements = () => {
		if (customHeader) {
			return customHeader;
		}

		return (
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
		);
	};

	const getButtonElements = () => {
		if (customButtons) {
			return customButtons;
		}

		return buttons ? (
			<button type="button" onClick={buttons.handleClick}>
				{buttons.title}
			</button>
		) : (
			""
		);
	};

	return (
		<RBottomSheet
			open={open}
			onDismiss={() => onDismiss()}
			header={getHeaderElements()}
			footer={<div className="bottom-footer">{getButtonElements()}</div>}
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
		handleClick: null,
	},
	customHeader: null,
	customButtons: null,
};

export default React.memo(BottomSheet);
