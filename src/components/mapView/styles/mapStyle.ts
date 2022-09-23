import styled from "styled-components";

export const StyledMapViewContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

export const StyledFullMap = styled.div`
	width: 100%;
	height: 100vh;
	background: ${({ theme }) => theme.colors.white};
`;

export const StyledMapHeader = styled.div`
	width: 100%;
	max-width: ${({ theme }) => theme.widths.layout};
	background: transparent;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.header};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	height: ${({ theme }) => theme.heights.header};
	gap: 12px;

	> .mapSearchInput {
		flex: 1;
		display: flex;
		align-items: center;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid ${({ theme }) => theme.colors.black};
		border-radius: 30px;
		height: 36px;
		padding: 8px 20px;

		> input {
			width: 100%;
			font-weight: 500;
			font-size: 14px;
			line-height: 19px;
			padding: 0;
		}
	}

	> button {
		width: 36px;
		height: 36px;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid ${({ theme }) => theme.colors.black};
		border-radius: 36px;
		padding: 6px;
		cursor: pointer;

		> img {
			width: 20px;
			height: 20px;
		}
	}
`;

export const StyledMapResult = styled.div`
	width: 100%;
	max-width: ${({ theme }) => theme.widths.layout};
	background: rgba(252, 251, 247, 0.8);
	backdrop-filter: blur(2px);
	position: fixed;
	bottom: 0;
	z-index: ${({ theme }) => theme.zIndex.header};
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 0;

	> div {
		// 스크롤바 숨김
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	> .filterContainer {
		display: flex;
		overflow-x: auto;
		gap: 12px;

		&::after {
			content: "";
			border-right: 8px solid transparent;
		}

		> div {
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 20px;
			font-weight: 500;
			font-size: 13px;
			line-height: 18px;
			padding: 6px 16px;
			white-space: nowrap;
			cursor: pointer;

			&:first-child {
				margin-left: 20px;
			}
		}
	}

	> .eventsContainer {
		.swiper-slide {
			width: 100%;
			padding: 0 20px 4px 16px; // 그림자
		}
	}
`;

export default {};
