import styled from "styled-components";

const StyledBiasChip = styled.span`
	font-size: 13px;
	line-height: 19px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.white};
	background: ${({ theme }) => theme.colors.black};
	padding: 4px 12px;
	border-radius: 24px;
	white-space: nowrap;
	width: fit-content;
	height: 26px;
`;

export { StyledBiasChip };
export default {};
