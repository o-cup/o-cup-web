import styled, { keyframes } from "styled-components";

export const LoadingContainerStyle = styled.div`
	display: flex;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.loadingBackground};
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	overflow: auto;
	max-width: ${({ theme }) => theme.widths.layout};
	height: calc(100vh + ${({ theme }) => theme.heights.header});
	background: ${({ theme }) => theme.colors.background};
`;

const spinnerKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinnerWrapper = styled.div`
	display: inline-block;
	width: 23px;
	height: 23px;
	margin: auto;
	z-index: ${({ theme }) => theme.zIndex.loadingSpinner};

	div {
		position: absolute;
		box-sizing: border-box;
		display: block;
		width: 23px;
		height: 23px;
		border-radius: 50%;
		animation: ${spinnerKeyframe} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border: 2px solid;
		border-color: ${({ theme }) => theme.colors.gray} transparent transparent transparent;
	}

	div:nth-child(1) {
		animation-delay: -0.45s;
	}

	div:nth-child(2) {
		animation-delay: -0.3s;
	}

	div:nth-child(3) {
		animation-delay: -0.15s;
	}
`;

export default {};
