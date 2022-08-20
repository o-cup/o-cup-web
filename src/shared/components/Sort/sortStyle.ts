import styled from "styled-components";

const StyledSort = styled.div`
	i.sort {
		position: relative;
	}

	ul {
		width: 120px;
		position: absolute;
		bottom: -120px;
		right: 0;
		z-index: 1;
		box-shadow: ${({ theme }) => theme.style.shadow};
		background-color: ${({ theme }) => theme.colors.background};

		li {
			height: 42px;
			font-size: 14px;
			padding: 10px;

			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
`;

export default StyledSort;
