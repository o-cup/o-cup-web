import styled from "styled-components";

const StyledDateRangeInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;

  > .dateInputContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 6px;

    > span {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    
    > div.disabledCalendarInput {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: #E5E5E5;
      border: 2px solid #000000;
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.gray};
      height: 48px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }

    > button.calendarOpenInput {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: #FFFFFF;
      border: 2px solid #000000;
      border-radius: 4px;
      height: 48px;
      cursor: pointer;

      > input {
        width: 100%;
        outline: none;
        text-align: center;
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        &:disabled {
          background: #FFFFFF;
        }
      }

      > i#calendar {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        display: inline-block;
        background: url("/images/icons/calendar.png") no-repeat;
        background-size: contain;
        height: 24px;
        width: 24px;
      }
    }
  }
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;
  border: 2px solid #000000;
  border-radius: 4px;

  .dateCheckContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9f368;
    padding: 14px 20px 14px 32px;

    > p {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
    
    > button {
      background: #000000;
      border-radius: 4px;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #FFFFFF;
      padding: 10px 20px;
    }
  }
`;

export { StyledDateRangeInput, StyledCalendarContainer };
export default {};