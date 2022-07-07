import styled from "styled-components";

const StyledSpecialGoodsInfo = styled.div`
  padding: 32px 20px;

  > h4 {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
  }

  > p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #7A7A7A;
  }

  > button {
    display: block;
    margin-left: auto;
    margin-top: 20px;
    background: #F9F368;
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

const StyledGoodsListAND = styled.ul`
  padding-top: 8px;
  display: flex;
  align-items: center;

  > li:not(:last-child):after {
    content: "+";
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const StyledGoodsListOR = styled.ul`
  padding-top: 8px;
  display: flex;
  align-items: center;

  > li:not(:last-child):after {
    content: "|";
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 12px;
  }
`;

const StyledGoodsChip = styled.span`
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 30px;
  box-shadow: 0 4px 0 #000000;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 6px 12px;
`;


export {StyledSpecialGoodsInfo, StyledGoodsList, StyledGoodsListAND, StyledGoodsListOR, StyledGoodsChip};
export default {};
