import styled from "styled-components";

const StyledEventMain = styled.div`
	position: relative;
	padding-top: 18px;
	padding-bottom: 18px;

	.textContainer {
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000000;
		padding: 16px 16px 68px;
		margin-left: 24px;
		margin-right: 44px;
		margin-bottom: 20px;
		position: relative;
		box-shadow: 6px 6px 0 #000000;

		> div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 12px;

			> h6 {
				font-size: 24px;
				line-height: 32px;
				font-weight: 700;
			}
		}

		> p {
			font-size: 14px;
			line-height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > img,
      > svg {
        margin-right: 4px;
        width: 14px;
        min-width: 14px;
      }

			&:not(:last-child) {
				margin-bottom: 8px;
			}
		}
	}

	.imgContainer {
		width: calc(100% - 54px);
		min-height: 264px;
		height: 100%;
		position: relative;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid #000000;
		z-index: ${({ theme }) => theme.zIndex.imageCarousel};
		margin-top: -74px;
		margin-left: 30px;
		margin-right: 24px;

		.slick-slider,
		.slick-list,
		.slick-slide {
			height: inherit !important;
		}

		.slick-dots {
			width: auto;
			bottom: 0;
			right: 0;
		}

		.slick-dots li {
			width: fit-content;
			height: auto;
			position: relative;
			display: none;
			margin: 16px;
			padding: 8px 20px;
			cursor: pointer;
		}

		.slick-dots li.slick-active {
			display: inline-block;
			white-space: nowrap;
			background: rgba(0, 0, 0, 0.6);
			backdrop-filter: blur(4px);
			border-radius: 45px;

			> span {
				font-weight: 500;
				font-size: 14px;
				line-height: 17px !important;
				color: ${({ theme }) => theme.colors.white};
			}
		}

		img {
			width: 100%;
			height: 100% !important;
      min-height: 264px;
			object-fit: cover;
			object-position: top;
      vertical-align : bottom;
		}
	}
`;

export { StyledEventMain };
export default {};
