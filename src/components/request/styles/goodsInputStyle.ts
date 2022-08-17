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


const SelectWrapper = styled.div`
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

export { StyledGoodsInput, SelectWrapper };
export default {};