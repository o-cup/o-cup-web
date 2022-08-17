import styled from "styled-components";

const StyledGoodsInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;

  > .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  > div:nth-child(3) {
    margin-top: -8px;
  }
`;


const StyledSelectWrapper = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
  display: flex;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  background: #E5E5E5;
  align-items: center;
  padding: 0 16px;

  input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }

  input[disabled] {
    background: #E5E5E5;
  }

  button {
    display: flex;
    background: url("/images/icons/dropdown-arrow.png") no-repeat;
    background-size: contain;
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
`;

const StyledChipContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;

  > button.chipAddButton {
    display: flex;
    align-items: center;
    height: 30px;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid #000000;
    border-radius: 30px;
    box-shadow: 0 4px 0 #000000;
    padding: 11px 7px;

    > i.plus {
      background: url("/images/icons/plus.png") no-repeat;
      background-size: contain;
      height: 14px;
      width: 14px;
    }
  }
`;

export { StyledGoodsInput, StyledSelectWrapper, StyledChipContainer };
export default {};