import styled from "styled-components";

const StyledArtistInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
`;

export { StyledArtistInput };
export default {};