import styled from "styled-components";

export const StyledBiasListContainer = styled.section`
	display: flex;
	flex-direction: column;

	div.dateTitle {
		display: flex;
		align-items: center;
		padding: 12px 20px;
		gap: 9px;

		> p {
			font-weight: 600;
			font-size: 18px;
			line-height: 25px;
		}
	}
`;

export const StyledBiasList = styled.ul`
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

export const StyledBias = styled.li`
	cursor: pointer;
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 12px 0 10px;

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

export const StyledBirthDayHat = styled.span`
	background: ${(props) => `url("/images/hats/${props.color}.png") no-repeat 50% / contain`};
	position: absolute;
	width: 34px;
	height: 35px;
	top: -12px;
	right: -3px;
`;

export default {};
