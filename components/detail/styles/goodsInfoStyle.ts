import styled from "styled-components";

const StyledGoodsInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 40px;

	> p.title {
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
`;

const StyledGoodsListItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	p.goods_title {
		margin-bottom: 16px;
	}

	ul {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		height: fit-content;
		margin-bottom: 16px;
	}

	ul.fcfs,
	ul.lucky {
		flex-direction: column;
		align-items: flex-start;
	}

	ul.default,
	ul.extra {
		> li {
			display: flex;
			align-items: center;
			gap: 8px;
			height: fit-content;
		}
	}
`;

const StyledHighLightItem = styled.li`
	display: flex;
	align-items: flex-start;

	// 기념일 순서 앞으로
	&.dDay {
		order: -1;
	}

	> .labelContainer {
		&.length_2 {
			width: 36px;
			min-width: 36px;
		}

		&.length_3 {
			width: 48px;
			min-width: 48px;
		}

		// 기념일 제외
		&.length_6 {
			width: 70px;
			min-width: 70px;
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
