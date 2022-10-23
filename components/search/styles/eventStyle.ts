import styled from "styled-components";

export const StyledEvent = styled.li<{ isEnd: boolean }>`
	display: flex;
	gap: 20px;

	min-width: 320px;
	width: 100%;
	height: 184px;
	padding: 10px;
	background-color: ${({ theme }) => theme.colors.white};
	border: 2px solid
		${({ theme, isEnd }) =>
			isEnd ? theme.colors.disabled : theme.colors.black};
	box-shadow: 4px 4px 0
		${({ theme, isEnd }) =>
			isEnd ? theme.colors.disabled : theme.colors.black};

	position: relative;
	cursor: pointer;

	color: ${({ theme, isEnd }) =>
		isEnd ? theme.colors.disabled : theme.colors.black};

	@media all and (max-width: 400px) {
		gap: 15px;
	}

	.poster {
		min-width: 110px;
		width: 110px;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&:before {
			content: "";
			background-color: #000;
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: ${(props) => (props.isEnd ? "0.4" : "0")};
		}

		&:after {
			content: "지난 이벤트";
			color: ${(props) => (props.isEnd ? "#fff" : "transparent")};
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			text-align: center;
			font-size: 13px;
			font-weight: bold;
		}
	}

	& > div {
		display: flex;
		flex-direction: column;
		max-width: calc(100% - 125px);
		width: 100%;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 8px;

			h2 {
				font-size: 18px;
				font-weight: bold;
				line-height: 25px;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			img.category_icon {
				width: 24px;
				min-width: 24px;
				height: 24px;
				object-fit: contain;
				margin-left: 2px;
			}
		}

		.biases {
			display: flex;
			gap: 5px;
			margin-bottom: 14px;
		}

		ul.extraInfo {
			height: 80px;
			display: flex;
			flex-direction: column;
			flex: 1 1 0;
			justify-content: space-between;

			li {
				display: flex;
				align-items: center;
				font-size: 12px;
				height: 20px;

				i,
				svg {
					color: ${({ theme }) => theme.colors.gray};
					min-width: 14px;
					margin-right: 6px;
				}

				p {
					display: flex;
					align-items: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: ${({ theme }) => theme.colors.gray};

					> i.event_day {
						width: 6px;
						min-width: 6px;
						height: 6px;
						margin-left: 4px;
						margin-right: 0;
						background-color: ${({ theme }) => theme.colors.eventDay};
						display: inline-block;
						border-radius: 50%;
					}
				}
			}
		}
	}
`;

export default {};
