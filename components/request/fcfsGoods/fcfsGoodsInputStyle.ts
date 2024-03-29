import styled from "styled-components";

export const StyledFcfsGoodsInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;

  > div.fcfsNotice {
    margin-top: 8px;

    .dateNotice {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: ${({ theme }) => theme.colors.red};
    }

    .notice {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: ${({ theme }) => theme.colors.gray};
    }
  }
`;

export const StyledFcfsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  > .checkOpen {
    opacity: 0.5;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: inherit;
    }

    > button {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      outline: none;
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

export const StyledFcfsTypeSelector = styled.li`
  display: flex;
  pointer-events: none;
  gap: 6px;

  &.active {
    opacity: 1;
    pointer-events: inherit;
  }

  > button.typeButton {
    flex: 1 1 33%;
    display: flex;
    align-items: center;
    text-align: left;
    background: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.black};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    padding: 8px;
    white-space: pre;

    &.selected {
      background: ${({ theme }) => theme.colors.primary};
    }

    &.notSelected {
      opacity: 0.5;
    }

    > i {
      margin-right: 6px;
    }
  }
`;

export const StyledFcfsContentContainer = styled.ul`
  display: flex;
  align-items: flex-start;
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
  }
`;


export default {};