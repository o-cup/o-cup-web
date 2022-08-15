import styled, { css } from "styled-components";

const StyledBasicInput = styled.div<{ isSnsId: boolean; isHashTag: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;

	.inputWrapper {
		position: relative;
		height: 48px;
		width: 100%;
		gap: 6px;

		${(props) =>
			props.isSnsId &&
			css`
				&:after {
					content: "@";
					position: absolute;
					top: 16px;
					left: 10px;
				}
			`};

		${(props) =>
			props.isHashTag &&
			css`
				&:after {
					content: "#";
					position: absolute;
					top: 17px;
					left: 11px;
					font-size: 16px;
				}
			`};

		input {
			width: 100%;
			height: 100%;
			border: 2px solid ${({ theme }) => theme.colors.black};
			border-radius: 4px;
			padding: 0 10px;

			&.snsId {
				padding-left: 30px;
			}

			&.hashTag {
				padding-left: 25px;
			}
		}
	}
`;

const Label = styled.label<{ hideLabel: boolean }>`
	line-height: 20px;
	position: relative;
	display: ${(props) => (props.hideLabel ? "none" : "")};
`;

export { StyledBasicInput, Label };
export default {};
