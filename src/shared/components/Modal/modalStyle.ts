import styled from "styled-components";

export const StyledModalBackground = styled.div`
	display: block;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.modal};
	left: 0;
	top: 0;
	width: 100%;
	overflow: auto;
	height: calc(100vh + ${({ theme }) => theme.heights.header});
	background-color: rgba(0, 0, 0, 0.4);
`;

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
