import styled from "styled-components";

export const StyledModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 380px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 4px;
	border: 2px solid #000;
`;

export default {};
