import styled from "styled-components";

export const StyledPlaceInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;
`;

export const StyledPlaceCustomInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;

	.address {
		div:nth-child(2) {
			margin-top: -2px;
		}
	}
`;

export default {};
