import styled from "styled-components";

const StyledGoodsChip = styled.span`
  width: fit-content;
  height: 30px;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #000000;
  border-radius: 30px;
  box-shadow: 0 4px 0 #000000;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 6px 12px;
  white-space: nowrap;
`;


export { StyledGoodsChip };
export default {};
