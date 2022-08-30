import styled from "styled-components";

const StyledGoodsInfo = styled.div`
  padding: 0 20px;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  gap: 4px;

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
    box-shadow: 0 4px 0 #000000;
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
      margin-right: 12px;
    }
  }
  
  ul.fcfs,
  ul.lucky {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledHighLightItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  > .highlight {
    font-weight: 600;
    font-size: 12px;
    line-height: 26px;
    height: 26px;
    background: url("/images/icons/highlight.png") no-repeat center;
    background-size: 100% 20px;
    padding: 2px 4px 1px 0;
    margin-right: 4px;
    margin-bottom: 6px;
    position: relative;
    white-space: nowrap;
  }

  > .chipContainer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
}
`;

export { StyledGoodsInfo, StyledGoodsListItem, StyledHighLightItem };
export default {};
