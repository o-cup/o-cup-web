import styled from "styled-components";

const StyledDistrictSelector = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primary};

	h2 {
		line-height: 50px;
		font-size: 14px;
		font-weight: bold;
		text-align: center;

		display: flex;
		align-items: center;
		gap: 3px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		h6 {
			font-size: 12px;
		}

		.districts {
			display: flex;
			width: 100%;
			height: 100%;

			ul {
				width: 50%;
				height: 310px;
				overflow: scroll;
				background-color: ${({ theme }) => theme.colors.white};

				::-webkit-scrollbar {
					display: none;
				}

				li {
					line-height: 36px;
					font-size: 12px;
					padding: 0 20px;
					cursor: pointer;

					&:hover {
						background-color: rgba(249, 243, 104, 0.3);
					}

					&.selected {
						background-color: rgba(249, 243, 104, 0.3);
						font-weight: bold;
					}
				}
			}
		}

		> .result {
			width: 100%;
			display: flex;
			flex-direction: column;

			height: 132px;
			padding: 15px;

			.chips {
				display: flex;
				gap: 10px;
				height: 100%;
				flex-wrap: wrap;
				justify-content: flex-start;

				.chip {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 30px;
					background-color: ${({ theme }) => theme.colors.white};
					width: fit-content;
					border: 2px solid #000;
					font-size: 12px;
					font-weight: bold;
					border-radius: 30px;
					gap: 6px;
					cursor: pointer;
					padding: 0 10px;
				}
			}

			.submit {
				width: 100%;
				height: 30px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				p {
					color: ${({ theme }) => theme.colors.gray};
					font-size: 10px;
				}

				button {
					width: 63px;
					height: 30px;
					color: #fff;
					background-color: #000;
					border-radius: 16px;
					font-weight: bold;
				}
			}
		}
	}
`;

export { StyledDistrictSelector };
export default {};
