import styled from "styled-components";

const StyledEventMain = styled.div`
  position: relative;
  padding-top: 18px;
  padding-bottom: 18px;
`;

const StyledEventImages = styled.div`
  position: relative;
  background: #FFFFFF;

  > img {
    width: calc(100% - 32px);
    height: 264px;
    object-fit: cover;
    object-position: top;
    border: 2px solid #000000;
    margin-top: -74px;
    margin-left: 16px;
    margin-right: 16px;
    z-index: 2;
  }
`;

const StyledEventMainInfo = styled.div`
  background: #FFFFFF;
  border: 2px solid #000000;
  padding: 16px 16px 68px;
  margin-left: 10px;
  margin-right: 44px;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 6px 6px 0 #000000;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;

    > h6 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
    }

    > span {
      font-size: 13px;
      line-height: 17px;
      font-weight: 700;
      color: #FFFFFF;
      background: #000000;
      padding: 4px 12px;
      border-radius: 24px;
    }
  }

  > p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;

    > svg {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      vertical-align: middle;
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

`;

export {StyledEventMain, StyledEventImages, StyledEventMainInfo};