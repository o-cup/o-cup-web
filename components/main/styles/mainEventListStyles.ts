import styled from "styled-components";

export const StyledMainEventSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 36px;
	padding-top: 15px;
`;

export const StyledMainEventList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	> .title {
		display: flex;
		padding: 0 20px;
		gap: 4px;

		> p {
			font-weight: 700;
			font-size: 16px;
			line-height: 20px;
		}

		> span {
			font-weight: 500;
			font-size: 13px;
			line-height: 20px;
			color: ${({ theme }) => theme.colors.gray};
		}
	}

	> ul.category {
		padding: 0 20px;
		display: flex;
		gap: 12px;
		margin-bottom: 4px;

		> li {
			height: 34px;
		}
	}
`;

export const StyledMainSwiper = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 14px;

	.mainSwiper,
	.swiper-wrapper {
		width: 100%;
		margin: 0;
	}

	.swiper-slide {
		width: 214px;
		padding-bottom: 4px; // 그림자
	}
`;

export const StyledCategoryBorder = styled.span<{ type: string }>`
	background: ${(props) => props.theme.category[props.type].primary};
	width: 100%;
	height: 6px;
	position: absolute;
	top: 0;
	left: 0;
`;

export const StyledMainListItem = styled.div`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;
	width: 214px;
	max-width: 214px;
	min-width: 214px;

	.imgContainer {
		img {
			width: 176px;
			height: 235px;
			object-fit: cover;
			vertical-align: center;
		}

		img.error {
			object-position: top;
		}
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		> p {
			font-size: 20px;
			line-height: 50px;
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			> span {
				font-size: 20px;
				line-height: 50px;
				font-weight: 700;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 4px;

		> li {
			width: 100%;
			color: ${({ theme }) => theme.colors.gray};
			font-size: 14px;
			line-height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;

			> p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		i,
		svg {
			margin-right: 4px;
			width: 16px;
			min-width: 16px;
		}
	}
`;

export default {};
