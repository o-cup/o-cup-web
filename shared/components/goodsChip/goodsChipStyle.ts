import styled from "styled-components";

const StyledGoodsChip = styled.span`
	width: fit-content;
	//max-width: 270px;
	//height: 30px;
	height: fit-content;

	background: ${({ theme }) => theme.colors.white};
	border: 1px solid #000000;
	border-radius: 30px;
	box-shadow: 0 4px 0 #000000;
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	padding: 6px 12px;
	margin-bottom: 4px;
`;

export { StyledGoodsChip };
export default {};
