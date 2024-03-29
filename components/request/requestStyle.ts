import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

const StyledCheckEvent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 480px;
	gap: 32px;
	padding: 0 20px;
	margin: 0 auto;

	> div.checkNotice {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 40px 0;
		width: 100%;

		> img {
			width: 24px;
			height: 31px;
		}

		> p {
			font-weight: 500;
			font-size: 14px;
			line-height: 19px;
			text-align: center;
			color: #000;
		}
	}

	> div.categoryContainer {
		width: 100%;

		> p {
			font-weight: 400;
			font-size: 14px;
			line-height: 19px;
			margin-bottom: 9px;
		}

		> ul {
			display: flex;
			gap: 12px;

			> li {
				height: 30px;
			}
		}
	}

	> div.btnContainer {
		width: 100%;

		&.disabled {
			opacity: 50%;
			pointer-events: none;
		}
	}
`;

const StyledEntry = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;
	padding: 32px 20px;
	width: 100%;

	.inputsWrapper {
		display: flex;
		flex-direction: column;
		gap: 48px;
		width: 100%;
	}

	> .ctaContainer {
		display: flex;
		width: 100%;
		gap: 20px;
		margin-top: 30px;
	}
`;

const Label = styled.label<{ hideLabel?: boolean }>`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	position: relative;
	display: ${(props) => (props.hideLabel ? "none" : "")};
`;

const StyledPreview = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	padding: 14px 0;

	//@media ${({ theme }) => theme.device.mobile} {
	display: none;
	//}

	.previewContent {
		width: 100%;
	}
`;

const StyledRequestBottomSheet = styled.div`
	width: 100%;
	padding: 0 20px 32px;

	.previewContent {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
`;

const StyledRequestModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	border: 2px solid #000;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 4px;
	padding: 20px;

	> h4 {
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
	}

	> p {
		margin-top: 8px;
		font-weight: 500;
		font-size: 14px;
		line-height: 19px;
	}

	.modalBtnContainer {
		display: flex;
		gap: 12px;
		margin-top: 20px;
		height: 30px;

		> button {
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 30px;
			box-shadow: 0 4px 0 #000000;
			font-weight: 400;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			padding: 6px 12px;
			min-width: 116px;

			&.alertBtn {
				width: 72px;
			}
		}
	}
`;

const StyledDuplicatedModal = styled.div`
	width: 100%;
	border: none;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 4px;
	padding: 40px 14px;
	text-align: center;

	> p {
		font-weight: 500;
		font-size: 14px;
		line-height: 19px;
		text-align: center;
	}

	.modalBtnContainer {
		display: flex;
		gap: 12px;
		margin-top: 40px;
		justify-content: center;
	}
`;

const StyledDuplicatedEvent = styled.div`
	height: 166px;
	border: 2px solid #000;
	padding: 10px;
	display: flex;
	gap: 10px;
	position: relative;
	background-color: #fff;
	box-shadow: 4px 4px 0 #000000;
	width: 100%;
	cursor: pointer;
	margin-top: 40px;

	img {
		width: 100px;
		height: 100%;
		object-fit: cover;
	}

	> div {
		display: flex;
		flex-direction: column;
		flex: 1 1 0;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h2 {
				font-weight: 700;
				font-size: 16px;
				line-height: 22px;
			}

			> img {
				width: 22px;
				min-width: 22px;
				height: 22px;
			}
		}

		.biases {
			display: flex;
			gap: 5px;
			margin-top: 6px;
			margin-bottom: 16px;
		}

		.extraInfo {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			gap: 2px;
			overflow: hidden;

			p {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 12px;
				line-height: 20px;
				color: ${({ theme }) => theme.colors.gray};
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				i {
					margin-right: 5px;
					min-width: 14px;
				}
			}
		}
	}
`;

export {
	StyledRequest,
	StyledCheckEvent,
	StyledEntry,
	StyledPreview,
	StyledRequestBottomSheet,
	Label,
	StyledRequestModal,
	StyledDuplicatedModal,
	StyledDuplicatedEvent,
};
export default {};
