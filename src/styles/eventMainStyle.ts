import styled from "styled-components";

export const StyledEventMain = styled.div`
  position: relative;
  padding-top: 18px;
  padding-bottom: 18px;

  .textContainer {
    background: #ffffff;
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

      > span.biasChip {
        font-size: 13px;
        line-height: 17px;
        font-weight: 700;
        color: #ffffff;
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
  }

  .imgContainer {
    width: calc(100% - 32px);
    height: 264px;
    position: relative;
    background: #ffffff;
    box-sizing: content-box !important;
    border: 2px solid #000000;
    z-index: 99;
    margin-top: -74px;
    margin-left: 16px;
    margin-right: 16px;

    .slick-slider,
    .slick-list,
    .slick-slide {
      height: inherit !important;
    }

    .slick-dots {
      width: auto;
      bottom: 0;
      right: 0;
    }
    
    .slick-dots li {
      width: fit-content;
      height: auto;
      position: relative;
      display: none;
      margin: 16px;
      padding: 8px 20px;
      cursor: pointer;
    }

    .slick-dots li.slick-active {
      display: inline-block;
      white-space: nowrap;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      border-radius: 45px;

      > span {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px !important;
        color: #FFFFFF;
      }
    }

    img {
      width: 100%;
      height: inherit !important;
      object-fit: cover;
      object-position: top;
    }
  }
`;

export default {};
