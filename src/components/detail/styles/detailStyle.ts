import styled from "styled-components";

const StyledDetail = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	> div:first-child {
		display: flex;
		flex-direction: column;
		width: 100%;

		@media ${({ theme }) => theme.device.desktop} {
			flex-direction: row;

			> div {
				width: 50%;
			}
		}

		.mainInfo,
		.subInfo {
			max-width: 540px;
		}
	}
`;

export { StyledDetail };
export default {};
