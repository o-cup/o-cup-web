import styled, { css } from "styled-components";

const StyledBasicInput = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	height: 100px;
	justify-content: center;
	max-width: 380px;
`;

const Label = styled.label<{ isSnsId: boolean; isHashTag: boolean }>`
	line-height: 20px;
	position: relative;

	${(props) =>
		props.isSnsId &&
		css`
			&:after {
				content: "@";
				position: absolute;
				top: 40px;
				left: 10px;
			}
		`};

	${(props) =>
		props.isHashTag &&
		css`
			&:after {
				content: "#";
				position: absolute;
				top: 40px;
				left: 10px;
			}
		`};
`;

// TODO: padding-left 리팩토링
const Input = styled.input<{ isSnsId: boolean; isHashTag: boolean }>`
	width: 100%;
	height: 48px;
	border: 2px solid ${({ theme }) => theme.colors.black};
	border-radius: 4px;
	padding: 0 10px;
	padding-left: ${(props) => (props.isSnsId ? "30px" : "")};
	padding-left: ${(props) => (props.isHashTag ? "25px" : "")};
`;

export { StyledBasicInput, Label, Input };
export default {};
