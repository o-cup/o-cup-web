import styled from "styled-components";

const StyledGoodsChipInput = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #000000;
  border-radius: 30px;
  box-shadow: 0 4px 0 #000000;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  span.hide {
    position: absolute;
    opacity: 0;
    font-size: 12px;
    line-height: 16px;
    z-index: -1;
  }

  input {
    min-width: 24px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    padding: 0;
    
    &.countInput {
      min-width: 8px;
      margin-left: 2px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  > button {
    width: 14px;
    height: 14px;
    background: url("/images/icons/delete.png") no-repeat 50% / contain;
    margin-left: 6px;
  }
`;


export { StyledGoodsChipInput };
export default {};
