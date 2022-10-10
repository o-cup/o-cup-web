import styled from "styled-components";

export const StyledEvent = styled.li`
	height: 184px;
	border: 2px solid #000;
	padding: 10px;
	display: flex;
	gap: 20px;
	position: relative;
	background-color: #fff;
	box-shadow: 4px 4px 0 #000000;
	min-width: 320px;
	width: 100%;
	cursor: pointer;

	@media all and (max-width: 400px) {
		gap: 15px;
	}

	img {
		min-width: 110px;
		width: 110px;
		height: 100%;
		object-fit: cover;
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
						width: 10px;
						min-width: 10px;
						height: 10px;
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
