import styled from "styled-components";

const StyledDistrictSelector = styled.div`
	padding: 0 20px;

	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background};

	.title {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		h2 {
			font-size: 14px;
			font-weight: bold;
			text-align: center;
		}

		p {
			font-size: 10px;
			color: ${({ theme }) => theme.colors.gray};
		}
	}

	.districts {
		display: flex;
		width: 100%;
		height: 250px;

		ul {
			width: 50%;
			overflow: scroll;
			background-color: ${({ theme }) => theme.colors.white};

			-ms-overflow-style: none;

			::-webkit-scrollbar {
				display: none;
			}

			&.main {
				border: 1px solid #c4c4c4;
				border-right: 0.5px solid #c4c4c4;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
			}

			&.sub {
				border: 1px solid #c4c4c4;
				border-left: 0.5px solid #c4c4c4;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}

			li {
				line-height: 36px;
				font-size: 12px;
				padding: 0 20px;
				cursor: pointer;

				&.selected {
					background-color: rgba(249, 243, 104, 0.3);
					font-weight: bold;
				}
			}
		}
	}

	.result {
		width: 100%;
		display: flex;
		flex-direction: column;

		height: 80px;
		padding: 10px 0;

		.chips {
			display: flex;
			row-gap: 6px;
			column-gap: 10px;
			height: 100%;
			flex-wrap: wrap;
			justify-content: flex-start;
			padding: 0;

			.chip {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 30px;
				background-color: ${({ theme }) => theme.colors.primary};
				width: fit-content;
				font-size: 12px;
				font-weight: bold;
				border-radius: 30px;
				gap: 6px;
				cursor: pointer;
				padding: 0 15px;
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
`;

export { StyledDistrictSelector };
export default {};
