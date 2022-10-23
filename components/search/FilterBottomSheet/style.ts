import styled from "styled-components";

const StyledCustomHeader = styled.div`
	height: 49px;
	border-bottom: 1px solid #7a7a7a;
	position: relative;

	h2 {
		width: 100%;
		font-size: 18px;
		font-weight: bold;
		line-height: 24px;
		text-align: center;
	}

	div.reset {
		width: fit-content;
		position: absolute;
		right: 24px;
		top: calc(50% - 12px);
		transform: translateY(-50%);
	}
`;

const StyledFilter = styled.div`
	border: 1px solid blue;
	height: 88px;
	padding: 0 20px;
	display: flex;

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;

		width: calc(100% - 24px);

		div {
			display: flex;
			gap: 8px;

			i {
				width: 24px;
				height: 24px;
			}

			p {
				font-size: 16px;
				line-height: 24px;
			}
		}

		small {
			color: #7a7a7a;
			font-size: 12px;
			padding-left: 32px;
		}
	}

	.icon {
		width: 24px;
		display: flex;
		align-items: center;

		i.arrow-right {
			width: 100%;
		}
	}
`;

const StyledFilterBottomSheet = styled.div`
	border: 1px solid blue;
	max-height: 60vh;
`;

export { StyledCustomHeader, StyledFilter, StyledFilterBottomSheet };
