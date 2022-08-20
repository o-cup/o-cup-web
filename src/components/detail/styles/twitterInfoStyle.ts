import styled from "styled-components";

export const StyledTwitterInfo = styled.div`
	position: relative;
	padding: 24px;

	.account {
		display: inline-block;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000000;
		padding: 16px;
		margin-bottom: 24px;
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
				width: 24px;
				height: 24px;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
	}

	.hashTags {
		white-space: pre-line;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
	}
`;

export default {};
