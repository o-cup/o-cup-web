import styled from "styled-components";

const SelectList = styled.ul`
	width: 220px;
	height: 292px;
	padding: 0;
	overflow: scroll;
	background-color: #fff;

	&.main {
		border: 2px solid #000;
		border-right: 1px solid #000;
		border-radius: 4px 0px 0px 4px;
	}

	&.sub {
		border: 2px solid #000;
		border-left: 1px solid #000;
		border-radius: 0px 4px 4px 0px;
	}

	li {
		line-height: 36px;
		font-size: 12px;
		padding: 0 10px;
		cursor: pointer;

		&:hover {
			background-color: rgba(249, 243, 104, 0.3);
		}

		&.selected {
			background-color: rgba(249, 243, 104, 0.3);
			font-weight: bold;
		}
	}
`;

const StyledDistrictSelector = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		line-height: 80px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		width: 100%;
		border-bottom: 2px solid #000;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;

		h6 {
			font-size: 12px;
		}

		.nations {
			width: 100%;
			height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 8px;

			select {
				width: 184px;
				height: 44px;
				border: 2px solid #000;
				border-radius: 4px;
				font-size: 12px;
				padding: 0px 10px;
			}
		}

		.districts {
			display: flex;
			width: 100%;
			height: 328px;

			> div {
				display: flex;
				flex-direction: column;
				gap: 8px;
			}
		}

		> .selected {
			width: 100%;
			height: 95px;
			display: flex;
			flex-direction: column;

			.chipsContainer {
				display: flex;
				align-items: center;
				gap: 10px;
				height: 80px;
			}

			p {
				color: #7a7a7a;
				font-size: 10px;
				margin: 10px 0;
			}
		}

		button:last-child {
			width: 360px;
			height: 72px;
			background-color: #f9f368;
			border: 2px solid #000;
			border-radius: 40px;
			box-shadow: 0 4px 0 #000000;
			font-size: 18px;
			font-weight: bold;
			margin: 20px 0;
		}
	}
`;

const Chip = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 36px;
	background-color: #f9f368;
	width: fit-content;
	border: 2px solid #000;
	font-size: 12px;
	font-weight: bold;
	border-radius: 30px;
	gap: 8px;
	padding: 0px 10px;
	cursor: pointer;
`;

export { StyledDistrictSelector, Chip, SelectList };
export default {};
