import styled from "styled-components";

const StyledDetail = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	/** padding .detailInfo 안으로 이동함! */
	> div.detailInfo {
		display: flex;
		flex-direction: column;
		width: 100%;

		padding: 20px 20px 0 20px;
	}

	.subInfo {
		display: flex;
		flex-direction: column;
	}
`;

export { StyledDetail };
export default {};
