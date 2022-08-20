import styled, { css } from "styled-components";

const StyledGoodsInfo = styled.div`
	padding: 32px 24px;

	> h4 {
		font-weight: 700;
		font-size: 20px;
		line-height: 50px;
	}

	> p.notice {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: ${({ theme }) => theme.colors.gray};
	}

	> button.tweetOpenBtn {
		display: block;
		margin-left: auto;
		margin-top: 20px;
		background: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.black};
		border: 2px solid #000000;
		border-radius: 30px;
		box-shadow: 0 4px 0 #000000;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		padding: 6px 16px;
		cursor: pointer;
	}
`;

const StyledGoodsListItem = styled.div<{ type: "AND" | "OR" }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 16px 0;

	h6 {
		margin-bottom: 16px;
	}

	ul {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		> li {
			height: 30px;
			margin-bottom: 8px;
		}

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

export { StyledGoodsInfo, StyledGoodsListItem };
export default {};
