import styled, { css } from "styled-components";

const StyledGoodsInfo = styled.div`
	padding: 32px 20px;

	> h4 {
		font-weight: 700;
		font-size: 20px;
		line-height: 50px;
	}

	> p {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: #7a7a7a;
	}

	> button {
		display: block;
		margin-left: auto;
		margin-top: 20px;
		background: #f9f368;
		border: 1px solid #000000;
		border-radius: 30px;
		box-shadow: 0 4px 0 #000000;
		font-weight: 500;
		font-size: 16px;
		line-height: 22px;
		padding: 10px 20px;
	}
`;

const StyledGoodsList = styled.div`
	padding: 16px 0 24px;

	> h6 {
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
	}
`;

const Chip = styled.span`
	width: fit-content;
	height: 30px;

	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 30px;
	box-shadow: 0 4px 0 #000000;
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	padding: 6px 12px;
`;

const StyledGoodsListItem = styled.div<{ type: "AND" | "OR" }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	height: 100px;

	ul {
		display: flex;
		align-items: center;
		height: 40px;

		> li:not(:last-child):after {
			${(props) =>
				props.type === "AND"
					? css`
							content: "+";
					  `
					: css`
							content: "|";
					  `}
			margin: 14px;
		}
	}
`;

export { StyledGoodsInfo, StyledGoodsList, StyledGoodsListItem, Chip };
export default {};
