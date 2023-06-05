import styled from "styled-components";

export const StyledBiasSwiper = styled.div`
	display: flex;
	width: 100%;
	height: 112px;
	margin-bottom: 6px;

	.biasSwiper,
	.swiper-wrapper {
		width: 100%;
		height: 112px;
		margin: 0;
	}

	.swiper-slide {
		width: 68px;
	}
`;

export const StyledBias = styled.div`
	cursor: pointer;
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	padding: 12px 0 10px;

	> a,
	> div#search {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		> div {
			position: relative;
			width: 65px;
			height: 65px;
			background: ${({ theme }) => theme.colors.primary};
			border-radius: 50%;
			box-shadow: 3px 3px 0 #000000;

			> img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: ${({ theme }) => theme.colors.primary};
				object-fit: cover;
			}

			> img#search {
				width: 32px;
				height: 32px;
				border-radius: 0;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-52%, -52%);
			}
		}

		> p {
			text-align: center;
			font-size: 14px;
			line-height: 14px;
			width: 100%;
			max-width: 65px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;

export const StyledBirthDayHat = styled.span`
	background: ${(props) =>
		`url("/images/hats/${props.color}.png") no-repeat 50% / contain`};
	position: absolute;
	width: 34px;
	height: 35px;
	top: -12px;
	right: -3px;
`;

export default {};
