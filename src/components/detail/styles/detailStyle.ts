import styled from "styled-components";

const StyledDetail = styled.div`
	@media ${({ theme }) => theme.device.desktop} {
		display: flex;

		> div {
			width: 50%;
		}
	}
`;

export { StyledDetail };
export default {};
