import styled from "styled-components";

const StyledSearch = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;

	.input {
		height: 68px;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.filter {
		height: 104px;
		display: flex;
		align-items: center;
		padding: 16px 0;
		position: relative;

		i.sort {
			position: absolute;
			bottom: 16px;
			right: 0;
		}
	}
`;

export { StyledSearch };
export default {};
