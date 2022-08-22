import styled from "styled-components";

const StyledRequest = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledEntry = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 32px 24px;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }

  .notice {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    width: 100%;

    p:first-child {
      width: 133px;
      height: 28px;
      background-color: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
      font-weight: bold;
      border-radius: 30px;
      text-align: center;
      line-height: 28px;
    }

    p:not(:first-child) {
      line-height: 16px;
    }
  }

  .inputsWrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;

    .hashTags {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .iconWrapper {
        display: flex;
        width: 100%;
        justify-content: center;
      }
    }
  }

  > .ctaContainer {
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 64px;

    @media ${({ theme }) => theme.device.desktop} {
      > button:first-child {
        display: none;
      }
    }
  }
`;

const Label = styled.label<{ hideLabel?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
	position: relative;
	display: ${(props) => (props.hideLabel ? "none" : "")};
`;

const StyledPreview = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 14px 0;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
  
  .previewContent {
    width: 100%;
  }
`;

export { StyledRequest, StyledEntry, StyledPreview, Label };
export default {};
