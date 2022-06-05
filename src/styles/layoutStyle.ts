import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100vw;
	height: 100vh;
	border: 10px solid red;
	display: flex;
	flex-direction: column;

	header {
		height: 180px;
		border: 10px solid orange;
	}

	main {
		height: 100%;
		border: 10px solid pink;
	}

	footer {
		height: 100px;
		border: 10px solid purple;
	}
`;

export { StyledLayout };
export default {};
