import styled from "styled-components";

export const StyledPosterView = styled.div`
	display: block;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.modal};
	left: 0;
	top: 0;
	width: 100%;
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
