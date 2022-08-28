import styled from "styled-components";

export const StyledResult = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;

	.menu {
		display: flex;
		justify-content: space-between;
		height: 40px;

		p {
			line-height: 40px;
			font-size: 14px;
			color: ${({ theme }) => theme.colors.gray};
			width: 100%;
		}

		.icons {
			display: flex;
			width: fit-content;
			justify-content: flex-end;
			align-items: center;
			gap: 10px;
		}
	}

	.chips {
		display: flex;
		gap: 10px;
		padding: 5px 0;
		overflow-x: scroll;

		::-webkit-scrollbar {
			display: none;
		}
	}

	.events {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.request {
		border: 2px solid #000;
		box-shadow: 4px 4px 0 #000000;

		height: 188px;

		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			text-align: center;
			line-height: 100px;
		}
	}
`;

export default {};
