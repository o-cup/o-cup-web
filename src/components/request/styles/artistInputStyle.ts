import styled from "styled-components";

const StyledArtistInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;

  .customInputContainer {
    > div:last-child {
      margin-top: -2px;
    }
  }
`;

export { StyledArtistInput };
export default {};