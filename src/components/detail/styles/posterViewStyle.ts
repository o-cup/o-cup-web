import styled from "styled-components";

export const StyledPosterView = styled.div`
	display: block;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.modal};
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	width: 100%;
	max-width: ${({ theme }) => theme.widths.layout};
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
	overflow: hidden;

	i {
		cursor: pointer;
		position: fixed;
		top: 12px;
		right: 12px;
		z-index: 99;
	}

	> .imgPage {
		width: 72px;
		height: auto;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 16px;
		padding: 8px 20px;
		display: inline-block;
		white-space: nowrap;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		border-radius: 45px;
		z-index: 99;

		> span {
			font-weight: 500;
			font-size: 14px;
			line-height: 17px !important;
			color: ${({ theme }) => theme.colors.white};
		}
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;

		> img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center;
		}
	}

	.swiper-button-prev,
	.swiper-button-next {
		color: ${({ theme }) => theme.colors.white};
	}
`;

export default {};
