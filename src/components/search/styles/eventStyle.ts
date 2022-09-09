import styled from "styled-components";

export const StyledEvent = styled.div`
	height: 188px;
	border: 2px solid #000;
	padding: 10px;
	display: flex;
	gap: 20px;
	position: relative;
	background-color: #fff;
	box-shadow: 4px 4px 0 #000000;
	min-width: 320x;
	width: 100%;

	cursor: pointer;

	@media all and (max-width: 400px) {
		gap: 15px;
	}

	img {
		min-width: 110px;
		height: 100%;
		object-fit: cover;
	}

	& > div {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;

			h2 {
				font-size: 18px;
				font-weight: bold;
				line-height: 25px;
			}

			i {
				width: 10px;
				height: 10px;
				background-color: ${({ theme }) => theme.colors.eventDay};
				display: inline-block;
				border-radius: 50%;
				margin-top: 3px;
			}
		}

		.biases {
			display: flex;
			gap: 5px;
		}

		.extraInfo {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			p {
				font-size: 13px;
				color: ${({ theme }) => theme.colors.gray};

				i,
				svg {
					margin-right: 8px;
				}
			}

			p:last-child {
				font-size: 13px;
			}
		}
	}
`;

export default {};
