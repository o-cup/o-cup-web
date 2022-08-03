import styled from "styled-components";

const StyledList = styled.ul`
	padding: 10px 20px;

  @media ${({ theme }) => theme.device.desktop} {
    display: flex;
    flex-wrap: wrap;
    
    > div {
      width: calc(50% - 10px);
    }
    
    > div:nth-child(2n) {
      margin-left: 20px;
    }
  }
`;

const StyledItem = styled.li`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	margin-bottom: 24px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;

	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12px;

		> img {
			width: 100%;
			height: 230px;
			object-fit: cover;
			object-position: top;
			border: 2px solid #000000;
		}

		> h6 {
			font-size: 20px;
			line-height: 28px;
			font-weight: 700;
		}

		> span {
			font-size: 13px;
			line-height: 17px;
			font-weight: 700;
			color: ${({ theme }) => theme.colors.white};
			background: ${({ theme }) => theme.colors.black};
			padding: 4px 12px;
			border-radius: 24px;
		}
	}

	> p {
		color: ${({ theme }) => theme.colors.gray};
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;

		> svg {
			width: 16px;
			height: 16px;
			margin-right: 4px;
			vertical-align: middle;
		}

		&:not(:last-child) {
			margin-bottom: 8px;
		}
	}
`;

export { StyledList, StyledItem };
