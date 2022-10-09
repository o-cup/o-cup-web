import styled from "styled-components";

export const StyledToast = styled.div`
	display: flex;
	align-items: center;
	position: fixed;
	top: 14px;
	left: 50%;
	transform: translateX(-50%);
	z-index: ${({ theme }) => theme.zIndex.toast};
	background: ${({ theme }) => theme.colors.primary};
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	width: calc(100% - 40px);
	max-width: 440px;
	min-width: 320px;
	opacity: 0;
	padding: 14px 20px;
	animation: snack_animation 3s ease;
	animation-iteration-count: 1;

	> p {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: ${({ theme }) => theme.colors.black};
		white-space: pre;
	}

	@keyframes snack_animation {
		0% {
			opacity: 0;
		}
		20%,
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;

export default {};
