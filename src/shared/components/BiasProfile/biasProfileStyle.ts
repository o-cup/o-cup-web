import styled from "styled-components";

export const StyledBiasProfile = styled.li`
	width: 75px;
	height: 100%;
	z-index: 0;
	cursor: pointer;

	div {
		width: 100%;
		height: 100%;
		position: relative;

		img {
			width: 72px;
			height: 72px;
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
		width: 72px;
		height: 72px;
		background: ${({ theme }) => theme.colors.black};
		border-radius: 50%;
		position: absolute;

		z-index: -1;
		top: 3px;
		left: 3px;
	}
`;

export default {};
