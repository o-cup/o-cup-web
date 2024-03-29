import styled from "styled-components";

const StyledLocation = styled.div`
	margin-bottom: 40px;

	> p.title {
		font-weight: 700;
		font-size: 20px;
		line-height: 27px;
		margin-bottom: 22px;
	}

	> p.address {
		display: flex;
		align-items: center;
		gap: 4px;
		font-weight: 400;
		font-size: 14px;
		line-height: 19px;
		margin-top: 16px;

		svg {
			cursor: pointer;
		}
	}
`;

const StyledMap = styled.div`
	width: 100%;
	height: 220px;
	background: ${({ theme }) => theme.colors.white};
	border: 2px solid #000000;
`;

export { StyledLocation, StyledMap };
export default {};
