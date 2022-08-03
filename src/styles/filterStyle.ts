import styled from "styled-components";

const StyledFilter = styled.div`
	> .search_container {
		display: flex;
		padding: 18px 20px;

		> button {
			width: 40px;
			height: 40px;
			margin-left: 20px;
			background: ${({ theme }) => theme.colors.primary};
			border: 2px solid #000000;
			border-radius: 50%;
			padding: 0;
			cursor: pointer;

			> svg {
				width: 24px;
				height: 24px;
				margin: 2px 0 -2px;
			}
		}
	}
`;

const StyledBiasList = styled.ul`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;

	margin: 14px 0;

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
	background: ${({ theme }) => theme.colors.white};
	border: 2px solid #000000;
	border-radius: 32px;
	flex: 1 1 0;
	padding: 6px;

	> svg {
		width: 24px;
		height: 24px;
		margin: 0 8px;
	}

	> input {
		width: 100%;
		font-size: 16px;
		line-height: 24px;
		border: none;
		outline: none;
    padding: 0;
	}
`;

export { StyledFilter, StyledBiasList, StyledBias, StyledSearchInput };
