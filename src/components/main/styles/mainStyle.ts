import styled from "styled-components";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

const StyledBiasList = styled.ul`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;
	height: 124px;
	align-items: center;
	padding: 12px 0;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledBias = styled.li`
	margin: 0 12px;
	opacity: 0.5;
	cursor: pointer;

	&.active {
		opacity: 1;
	}

	&:first-child {
		margin-left: 24px;
	}

	&:last-child {
		margin-right: 24px;
	}

	> div {
		width: 72px;
		height: 72px;
		background: ${({ theme }) => theme.colors.primary};
		border-radius: 50%;
		position: relative;
		z-index: 1;

		> img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: ${({ theme }) => theme.colors.primary};
			object-fit: cover;
		}

		&:after {
			content: "";
			width: 72px;
			height: 72px;
			background: ${({ theme }) => theme.colors.black};
			border-radius: 50%;
			position: absolute;
			z-index: -1;
			top: 3px;
			left: 3px;
		}
	}

	> p {
		text-align: center;
		font-size: 14px;
		line-height: 16px;
		margin-top: 8px;
	}
`;

const StyledList = styled.ul`
	/* @media ${({ theme }) => theme.device.desktop} {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		> li,
		> div {
			width: calc(25% - 16px);
		}
	} */

	display: flex;
	flex-direction: column;
	padding: 0 20px;
	gap: 20px;
`;

const StyledItem = styled.li`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;

	/* @media ${({ theme }) => theme.device.mobile} {
		margin-bottom: 24px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		margin-bottom: 4px;
	} */

	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12px;

		> .lazy-image {
			width: 100%;
			height: 270px;

			img {
				width: 100%;
				height: 270px;
				object-fit: cover;
				object-position: top;
			}

			/* Error image */
			img.error {
				object-position: center;
			}
		}

		> h6 {
			font-size: 20px;
			line-height: 28px;
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

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
