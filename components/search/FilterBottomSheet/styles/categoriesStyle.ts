import styled from "styled-components";

const StyledCategories = styled.div`
	padding: 0 20px;

	.title {
		height: 50px;
		display: flex;
		gap: 10px;
		line-height: 50px;

		h3 {
			font-size: 14px;
			font-weight: bold;
		}

		p {
			font-size: 10px;
			color: ${({ theme }) => theme.colors.gray};
			line-height: 53px;
		}
	}

	.icons {
		height: 230px;
		display: flex;
		column-gap: 50px;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		@media all and (min-width: 420px) {
			column-gap: 60px;
		}

		p {
			width: 70px;
			height: 80px;
			display: flex;
			flex-direction: column;
			font-size: 12px;

			justify-content: center;
			align-items: center;
			gap: 8px;

			@media all and (min-width: 460px) {
				width: 80px;
			}

			img {
				height: 60px;
			}

			&.selected {
				font-weight: bold;
			}
		}
	}
`;

export default StyledCategories;
