import styled from "styled-components";

const StyledArtistContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  > button {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
    border: 2px solid #000000;
    border-radius: 70px;
    box-shadow: 0 4px 0 #000000;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    padding: 10px 16px;
    display: inline-block;
    margin-left: auto;
    margin-top: 10px;
  }
`

const StyledArtistInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;

  .customInputContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.colors.black};

    > div.customInputs {
      display: flex;
      border-bottom: 2px solid ${({ theme }) => theme.colors.black};

      > div {
        position: relative;
        height: 48px;
        width: 100%;

        > input {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          padding: 16px;
          font-size: 12px;
          line-height: 15px;
        }
      }

      > div:first-child {
        border-right: 2px solid ${({ theme }) => theme.colors.black};
      }
    }

    > div.customConfirm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 16px;
      position: relative;
      background: ${({ theme }) => theme.colors.white};

      > input {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        font-size: 12px;
        line-height: 15px;
      }

      > input[disabled] {
        background: ${({ theme }) => theme.colors.white};
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
  }
`;

export { StyledArtistContainer, StyledArtistInput };
export default {};