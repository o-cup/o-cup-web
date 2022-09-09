import styled from "styled-components";

const StyledGoodsInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-left: 12px;

	> h4 {
		font-weight: 700;
		font-size: 20px;
		line-height: 50px;
	}

	> p.notice {
		font-weight: 500;
		font-size: 11px;
		line-height: 15px;
		color: ${({ theme }) => theme.colors.black};
	}

	> button.tweetOpenBtn {
		display: block;
		margin-left: auto;
		margin-top: 20px;
		background: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.black};
		border: 2px solid #000000;
		border-radius: 30px;
		box-shadow: 0 3px 0 #000000;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		padding: 6px 16px;
		cursor: pointer;
	}
`;

const StyledGoodsListItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

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
			margin-right: 12px;
		}
	}

	ul.fcfs,
	ul.lucky {
		flex-direction: column;
		align-items: flex-start;

		> li {
			height: fit-content !important;
		}
	}
`;

const StyledHighLightItem = styled.li`
	display: flex;
	align-items: flex-start;
	margin-top: 12px;

	> .labelContainer {
		&.length_2 {
			width: 36px;
			min-width: 36px;
		}

		&.length_3 {
			width: 48px;
			min-width: 48px;
		}

		.highlight {
			width: fit-content;
			font-weight: 600;
			font-size: 12px;
			line-height: 26px;
			height: 26px;
			background: url("/images/icons/highlight.png") no-repeat center;
			background-size: 100% 20px;
			padding: 2px 4px 1px 0;
			margin-bottom: 6px;
			position: relative;
			white-space: nowrap;
		}
	}

	> .chipContainer {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		height: fit-content;
	}
`;

export { StyledGoodsInfo, StyledGoodsListItem, StyledHighLightItem };
export default {};
