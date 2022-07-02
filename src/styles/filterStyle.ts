import styled from "styled-components";

const StyledFilter = styled.div`

	> .search_container {
		display: flex;
		padding: 18px 20px;

		> button {
			width: 36px;
			height: 36px;
			margin-left: 20px;
			background: #FFFB8F;
			border: 2px solid #000000;
			border-radius: 50%;
			padding: 0;

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

	&:first-child {
		margin-left: 20px;
	}

	&:last-child {
		margin-right: 20px;
	}

	> div {
		width: 72px;
		height: 72px;
		background: #FFFB8F;
		border-radius: 50%;
		position: relative;
		z-index: 1;

		> img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: #FFFB8F;
			object-fit: cover;
		}

		&:after {
			content: "";
			width: 72px;
			height: 72px;
			background: #000000;
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
	background: #FFFFFF;
	border: 2px solid #000000;
	border-radius: 32px;
	flex: 1 1 0;
	padding: 4px;

	> svg {
		width: 24px;
		height: 24px;
		margin: 0 8px;
	}

	> input {
		width: 100%;
		font-size: 16px;
		line-height: 20px;
		border: none;
		outline: none;
	}
`;

export { StyledFilter, StyledBiasList, StyledBias, StyledSearchInput };