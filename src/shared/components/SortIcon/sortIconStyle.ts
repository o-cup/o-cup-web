import styled from "styled-components";

const StyledSortIcon = styled.div`
	position: relative;
	width: 100%;

	ul {
		width: 120px;
		position: absolute;
		bottom: -130px;
		right: 0;
		z-index: 1;
		box-shadow: ${({ theme }) => theme.style.shadow.default};
		background-color: ${({ theme }) => theme.colors.background};
	}
`;

const SortOption = styled.li<{ isActive: boolean }>`
	height: 42px;
	font-size: 14px;
	padding: 10px;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	cursor: pointer;

	background-color: ${(props) => (props.isActive ? props.theme.colors.softPrimary : "")};
`;

export { StyledSortIcon, SortOption };
