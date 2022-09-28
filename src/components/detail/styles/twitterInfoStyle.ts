import styled from "styled-components";

export const StyledTwitterInfo = styled.div`
	position: relative;
	padding: 20px 0 0 0;

	display: flex;
	flex-direction: column;
	gap: 20px;

	.account {
		width: fit-content;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000000;
		padding: 16px;
		position: relative;
		box-shadow: 4px 4px 0 #000000;

		> h6 {
			font-size: 14px;
			line-height: 19px;
			font-weight: 700;
		}

		> p {
			font-weight: 500;
			font-size: 12px;
			line-height: 15px;
			margin-top: 10px;

			> svg {
				width: 20px;
				height: 20px;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
	}

	.hashTags {
		font-weight: 400;
		font-size: 13px;
		line-height: 18px;
		flex-wrap: wrap;
		display: flex;
		gap: 10px;

		p {
			display: block;
			background-color: black;
			color: white;
			padding: 4px 8px;
			font-weight: bold;
			border-radius: 1px;
			min-width: fit-content;
		}
	}
`;

export default {};
