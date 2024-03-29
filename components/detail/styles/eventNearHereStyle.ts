import styled from "styled-components";

const StyledEventNearHere = styled.div`
	margin-top: 40px;
	width: 100%;

	> p.title {
		font-weight: 700;
		font-size: 20px;
		line-height: 27px;
		margin-bottom: 22px;
		padding-left: 20px;
	}

	.nearSwiper,
	.swiper-wrapper {
		width: 100%;
		margin: 0;
	}

	.swiper-slide {
		width: 120px;
	}
`;

const EventNearHereList = styled.div`
	background: ${({ theme }) => theme.colors.white};
	border: 2px solid #000000;
	margin-bottom: 4px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	display: inline-block;
	min-width: 120px;
	width: 120px;
	cursor: pointer;

	> img {
		width: 100%;
		height: 120px;
		object-fit: cover;
		object-position: 90% 10%;
	}

	> div {
		padding: 10px;

		> div.near_title {
			display: flex;
			align-items: center;
			margin-bottom: 4px;

			> img {
				width: 16px;
				min-width: 16px;
				height: 16px;
				object-fit: contain;
				margin-right: 4px;
			}

			> p.near_place {
				font-weight: 500;
				font-size: 12px;
				line-height: 16px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		> p.near_id {
			font-weight: 400;
			font-size: 10px;
			line-height: 14px;
			color: ${({ theme }) => theme.colors.gray};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;

export { StyledEventNearHere, EventNearHereList };
export default {};
