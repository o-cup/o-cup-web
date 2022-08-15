import styled from "styled-components";

const StyledPlaceInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;
`;

const StyledPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 2px solid #000000;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};

  > div.inputContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    > input {
      width: 100%;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      border: 0;
      padding: 0;
      outline: 0;
    }

    > .buttonContainer {
      display: flex;
      align-items: center;
      gap: 10px;

      > svg {
        cursor: pointer;
      }
    }
  }
`;

const StyledPlaceList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 2px solid #000000;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
  
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    position: relative;

    &:nth-child(2n) {
      background: #F7F7F7;
    }

    > div {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;

      > h4 {
        font-weight: 700;
      }
    }

    > button {
      background: ${({ theme }) => theme.colors.black};
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.white};
      white-space: nowrap;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      padding: 7px 12px;
      margin-left: 8px;
    }
  }
`;

export { StyledPlaceInput, StyledPlaceContainer, StyledPlaceList };
export default {};