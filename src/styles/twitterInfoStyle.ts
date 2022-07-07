import styled from "styled-components";

const StyledTwitterInfo = styled.div`
  position: relative;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const StyledOrganiserAccount = styled.div`
  display: inline-block;
  background: #FFFFFF;
  border: 2px solid #000000;
  padding: 16px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 24px;
  position: relative;
  box-shadow: 6px 6px 0 #000000;

  > h6 {
    font-size: 14px;
    line-height: 19px;
    font-weight: 700;
  }

  > p {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    margin-top: 10px;

    > svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
`;

const StyledHashTags = styled.p`
  white-space: pre-line;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export {StyledTwitterInfo, StyledOrganiserAccount, StyledHashTags};
export default {};
