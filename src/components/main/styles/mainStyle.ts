import styled from "styled-components";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const StyledBiasList = styled.ul`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;
	height: 100px;
	align-items: center;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledBias = styled.li`
	margin: 0 12px;
	opacity: 0.5;
	cursor: pointer;

	&.active {
		opacity: 1;
	}

	&:first-child {
		margin-left: 20px;
	}

	&:last-child {
		margin-right: 20px;
	}

	> div {
		width: 72px;
		height: 72px;
		background: ${({ theme }) => theme.colors.primary};

		border-radius: 50%;
		position: relative;
		z-index: 1;

		> img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: ${({ theme }) => theme.colors.primary};
			object-fit: cover;
		}

		&:after {
			content: "";
			width: 72px;
			height: 72px;
			background: ${({ theme }) => theme.colors.black};
			border-radius: 50%;
			position: absolute;
			z-index: -1;
			top: 3px;
			left: 3px;
		}
	}

	> p {
		text-align: center;
		font-size: 14px;
		line-height: 16px;
		margin-top: 8px;
	}
`;

const StyledSearchInput = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	padding: 0 20px;

	> input {
		width: 100%;
		font-size: 16px;
		line-height: 24px;
		border: none;
		outline: none;
		padding: 0;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000000;
		border-radius: 32px;
		flex: 1 1 0;
		padding: 4px;
		height: 40px;
	}

	> svg {
		width: 17px;
		height: 17px;
		margin: 0 8px;
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		left: 30px;
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

const StyledList = styled.ul`
	padding: 10px 20px;

	@media ${({ theme }) => theme.device.desktop} {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		> li,
		> div {
			width: calc(25% - 16px);
		}
	}
`;

const StyledItem = styled.li`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;

	@media ${({ theme }) => theme.device.mobile} {
		margin-bottom: 24px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		margin-bottom: 4px;
	}

	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12px;

		> img {
			width: 100%;
			height: 230px;
			object-fit: cover;
			object-position: top;
			//border: 2px solid #000000;
		}

		> h6 {
			font-size: 20px;
			line-height: 28px;
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	> p {
		color: ${({ theme }) => theme.colors.gray};
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		display: flex;
		align-items: center;

		> svg {
			margin-right: 4px;
		}

		&:not(:last-child) {
			margin-bottom: 8px;
		}
	}
`;

export { StyledMain, StyledBiasList, StyledBias, StyledSearchInput, StyledList, StyledItem };
export default {};
