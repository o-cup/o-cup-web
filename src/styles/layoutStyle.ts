import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100%;
	min-width: 320px;
	max-width: 480px;
	height: 100vh;
	/* border: 10px solid red; */
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	background: #FCFBF7;
    box-shadow: 0 0 20px rgb(0 0 0 / 5%);

	header {
		padding: 20px;
		/* border: 10px solid orange; */
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
