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
	height: calc(var(--vh, 1vh) * 100);
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(2px);
	overflow: hidden;

	div.topIcons {
		position: fixed;
		top: 12px;
		right: 12px;
		z-index: 99;
		display: flex;
		align-items: center;
		gap: 16px;

		> i {
			cursor: pointer;
		}

		> .imgPage {
			width: 72px;
			text-align: right;
			display: inline-block;
			white-space: nowrap;

			> span {
				font-weight: 500;
				font-size: 14px;
				line-height: 17px;
				color: ${({ theme }) => theme.colors.white};
			}
		}
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);

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
