import styled from "styled-components";

const StyledDetail = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 20px;

	padding-left: 8px;
	padding-bottom: 0;

	/* > div.detailInfo {
		display: flex;
		flex-direction: column;
		width: 100%; */

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
