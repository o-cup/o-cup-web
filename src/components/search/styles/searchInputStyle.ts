import styled from "styled-components";

export const StyledSearchInput = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;

	> input {
		width: 100%;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
		border: none;
		outline: none;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000;
		border-radius: 32px;
		padding: 0 20px;
	}

	i.search {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 17px;
	}

	> button {
		width: 40px;
		height: 40px;
		margin-left: 20px;
		background: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.black};
		border: 2px solid #000000;
		border-radius: 50%;
		padding: 0;
		cursor: pointer;

		> svg {
			width: 19px;
			height: 19px;
			margin: 2px 0 -2px;
		}
	}
`;

export default {};
