import styled from "styled-components";

export const StyledBiasProfile = styled.li`
	width: 20%;
	height: 100%;
	z-index: 0;

	// TODO: 480px 이상 대응 필요
	@media (max-width: 439px) {
		width: 25%;
	}

	display: flex;
	flex-direction: column;
	align-items: center;

	cursor: pointer;

	div {
		width: 68px;
		height: 100%;
		position: relative;

		img {
			width: 65px;
			height: 65px;
			object-fit: cover;
			border-radius: 50%;
		}

		p {
			font-size: 14px;
			width: 100%;
			text-align: center;
			height: 20px;
			line-height: 20px;
			margin-top: 3px;

			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	div:after {
		content: "";
		width: 65px;
		height: 65px;
		background: ${({ theme }) => theme.colors.black};
		border-radius: 50%;
		position: absolute;

		z-index: -1;
		top: 3px;
		left: 3px;
	}
`;

export default {};
