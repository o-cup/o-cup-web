import styled from "styled-components";

const StyledDetail = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	> div.detailInfo {
		display: flex;
		flex-direction: column;
		width: 100%;

    div.mainInfo,
    div.subInfo {
      width: 100%;
      max-width: 720px;
    }
    
		@media ${({ theme }) => theme.device.desktop} {
			flex-direction: row;

      div.mainInfo,
      div.subInfo {
				width: 50%;
			}
		}
	}
`;

export { StyledDetail };
export default {};
