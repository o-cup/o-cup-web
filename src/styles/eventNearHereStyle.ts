import styled from "styled-components";

const StyledEventNearHere = styled.div`
	padding: 32px 0;

	> h4 {
		padding: 0 20px;
		font-weight: 700;
		font-size: 20px;
		line-height: 27px;
		margin-bottom: 22px;
	}

	> ul {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		-ms-overflow-style: none;
		scrollbar-width: none;
		margin: 14px 0;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

const StyledEventNearHereList = styled.li`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid #000000;
  margin-right: 20px;
  margin-bottom: 4px;
  position: relative;
  box-shadow: 4px 4px 0 #000000;
  display: inline-block;
  min-width: 120px;
  width: 120px;
  cursor: pointer;

	&:first-child {
		margin-left: 20px;
	}

	&:last-child {
		margin-right: 20px;
	}

	> img {
		width: 100%;
		height: 120px;
		object-fit: cover;
		object-position: top;
	}

	> div {
		padding: 10px;

		> h6 {
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		> p {
			font-weight: 400;
			font-size: 10px;
			line-height: 14px;
			color: ${({ theme }) => theme.colors.gray};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;

export { StyledEventNearHere, StyledEventNearHereList };
export default {};
