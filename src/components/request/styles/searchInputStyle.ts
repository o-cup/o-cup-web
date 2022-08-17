import styled from "styled-components";

const StyledSearchInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;
`;

const InputWrapper = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
  display: flex;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;

  input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  input[disabled] {
    background: #E5E5E5;
  }

  button {
    border-left: 2px solid ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.primary};
    padding: 0 50px;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
  }
`;

const Label = styled.label`
  position: relative;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

export { StyledSearchInput, InputWrapper, Label };
export default {};