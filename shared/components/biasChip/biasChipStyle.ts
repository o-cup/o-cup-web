import styled from "styled-components";

export const StyledBiasChip = styled.span<{ disabled?: boolean }>`
	font-size: 13px;
	line-height: 19px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.white};
	background: ${({ theme, disabled }) =>
		disabled ? theme.colors.disabled : theme.colors.black};
	padding: 4px 12px;
	border-radius: 24px;
	white-space: nowrap;
	width: fit-content;
	height: 26px;
`;

export default {};
