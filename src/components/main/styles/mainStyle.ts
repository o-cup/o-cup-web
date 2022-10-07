import styled from "styled-components";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	div.dateTitle {
		display: flex;
		align-items: center;
		padding: 12px 20px;
		gap: 9px;

		> p {
			font-weight: 600;
			font-size: 18px;
			line-height: 25px;
		}
	}
`;

const StyledEmptyMain = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&.default {
		padding: 96px 0;

		> div > img {
			width: 316px;
			margin-bottom: 12px;
		}
	}

	&.small {
		padding: 64px 0;

		> div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			> p {
				font-weight: 500;
				font-size: 16px;
				line-height: 22px;
			}

			> img {
				width: 68px;
				height: 102px;
				margin: 20px;
			}
		}
	}
`;

export { StyledMain, StyledEmptyMain };
export default {};
