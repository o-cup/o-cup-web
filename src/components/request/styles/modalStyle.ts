import styled from "styled-components";

const StyledModalBackground = styled.div`
	display: block;
	position: fixed;
	z-index: 0;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
`;

const StyledModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 340px;
	background: #f9f368;
	border: 2px solid #000000;
	padding: 20px;
	/* box-shadow: 4px 4px 0 #000000; */

	> h4 {
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
	}

	> p {
		margin-top: 8px;
		font-weight: 500;
		font-size: 14px;
		line-height: 19px;
	}

	.modalBtnContainer {
		display: flex;
		gap: 12px;
		margin-top: 20px;

		> button {
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 30px;
			box-shadow: 0 4px 0 #000000;
			font-weight: 400;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			padding: 6px 12px;
		}
	}
`;

export { StyledModalBackground, StyledModal };
export default {};
