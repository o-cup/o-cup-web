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

	/* div.mainInfo,
		div.subInfo {
			width: 100%;
			max-width: 720px;
		} */

	/* @media ${({ theme }) => theme.device.desktop} {
			flex-direction: row;

			div.mainInfo,
			div.subInfo {
				width: 50%;
			}
		} */

	.subInfo {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
`;

export { StyledDetail };
export default {};
