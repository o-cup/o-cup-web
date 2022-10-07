import styled from "styled-components";

export const StyledBiasList = styled.ul`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;
	height: 112px;
	align-items: center;
	margin-bottom: 14px;

	&::-webkit-scrollbar {
		display: none;
	}

	&::before {
		content: "";
		border-left: 20px solid transparent;
	}
`;

export const StyledBias = styled.li`
	cursor: pointer;
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	padding: 12px 0 10px;
	margin-right: 20px;

	&:last-child {
		padding: 12px 20px 10px 0;
	}

	> a {
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
			white-space: nowrap;
		}
	}
`;

export const StyledBirthDayHat = styled.span`
	background: ${(props) => `url("/images/hats/${props.color}.png") no-repeat 50% / contain`};
	position: absolute;
	width: 34px;
	height: 35px;
	top: -12px;
	right: -3px;
`;

export default {};
