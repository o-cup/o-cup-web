import styled from "styled-components";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
`;

const StyledBiasList = styled.ul`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;
	height: 112px;
	align-items: center;
	padding: 0 20px;
	gap: 24px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledBias = styled.li`
	opacity: 0.5;
	cursor: pointer;
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 12px 0 10px;

	&.active {
		opacity: 1;
	}

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
		white-space: nowrap;
	}
`;

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	gap: 20px;

	/* @media screen and (min-width: 721px) and (max-width: 1000px) {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		> li,
		> div {
			width: calc(33% - 12px);
		}
	} */
`;

const StyledItem = styled.li`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;

	.imgContainer {
		> .lazy-image {
			width: 100%;
			height: 270px;

			img {
				width: 100%;
				height: 270px;
				object-fit: cover;
				object-position: 90% 10%;
				vertical-align: bottom;
			}

			img.error {
				object-position: top;
			}
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
		}
	}

	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 4px;

		> p {
			color: ${({ theme }) => theme.colors.gray};
			font-size: 14px;
			line-height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		i,
		svg {
			margin-right: 8px;
			width: 16px;
		}
	}
`;

const StyledEmptyMain = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&.default {
		padding: 96px 0;

		> div > img {
			width: 316px;
			margin-bottom: 12px;
		}
	}

	&.small {
		padding: 64px 0;

		> div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			> p {
				font-weight: 500;
				font-size: 16px;
				line-height: 22px;
			}

			> img {
				width: 68px;
				height: 102px;
				margin: 20px;
			}
		}
	}
`;

const StyledBirthDayHat = styled.span`
	background: ${(props) => `url("/images/hats/${props.color}.png") no-repeat 50% / contain`};
	position: absolute;
	width: 34px;
	height: 35px;
	top: -12px;
	right: -3px;
`;

export { StyledMain, StyledBiasList, StyledBias, StyledList, StyledItem, StyledEmptyMain, StyledBirthDayHat };
export default {};
