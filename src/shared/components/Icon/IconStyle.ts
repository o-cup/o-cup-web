import styled from "styled-components";

export const StyledIcon = styled.i`
	cursor: pointer;

  &.logo {
    display: flex;
    background: url("/images/logo_primary.png") no-repeat;
    background-size: contain;
    height: 56px;
    width: 75px;
  }
  
	&.plus-circle {
		display: flex;
		background: url("/images/icons/plus-circle.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
	}

  &.search {
    display: flex;
    background: url("/images/icons/search.png") no-repeat;
    background-size: contain;
    height: 24px;
    width: 24px;
  }
`;

export default {};
