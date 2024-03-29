import styled from "styled-components";

const StyledDetailMainInfo = styled.div`
	position: relative;
`;

const StyledDetailCategory = styled.span<{ type: string }>`
	background: ${(props) => props.theme.category[props.type].primary};
	width: 6px;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

const StyledDetailTextContainer = styled.div`
	background: ${({ theme }) => theme.colors.white};
	border: 2px solid #000000;
	padding: 16px 16px 68px;
	margin-right: 40px;
	margin-bottom: 15px;
	margin-left: -6px;
	position: relative;
	box-shadow: 6px 6px 0 #000000;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-bottom: 12px;

		> p {
			font-size: 24px;
			line-height: 28px;
			font-weight: 700;
		}

		> .chipContainer {
			height: fit-content;
			display: flex;
			align-items: center;
			gap: 4px;
			margin-left: 8px;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 3px;

		> li {
			width: 100%;
			font-size: 13px;
			line-height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;

			i {
				width: 16px;
				height: 16px;
				margin-right: 8px;
			}

			> p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			span.eventDay {
				display: flex;
				align-items: center;
				margin-left: 8px;
				white-space: nowrap;
				font-size: 10px;
				color: #19ca09;

				> i {
					width: 10px;
					height: 10px;
					background-color: ${({ theme }) => theme.colors.eventDay};
					display: inline-block;
					border-radius: 50%;

					margin-right: 3px;
				}
			}
		}
	}
`;

const StyledDetailImgContainer = styled.div`
	width: 100%;
	height: 100%;
	min-height: 200px;
	position: relative;
	background: ${({ theme }) => theme.colors.white};
	border: 2px solid #000000;
	z-index: ${({ theme }) => theme.zIndex.imageCarousel};
	margin-top: -74px;
	margin-right: 20px;
	cursor: pointer;

	.imgZoom {
		width: 40px;
		height: 40px;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 16px;
		padding: 10px;
		display: inline-block;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		border-radius: 45px;

		> img {
			width: 20px;
			height: 20px;
			min-height: 20px;
			object-fit: contain;
		}
	}
`;
export {
	StyledDetailMainInfo,
	StyledDetailCategory,
	StyledDetailTextContainer,
	StyledDetailImgContainer,
};
export default {};
