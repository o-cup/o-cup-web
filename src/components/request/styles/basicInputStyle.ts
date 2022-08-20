import styled from "styled-components";

const StyledBasicInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;
`;

const InputWrapper = styled.div<{ hasValue: boolean }>`
	position: relative;
	height: 48px;
	width: 100%;
	gap: 6px;

	&.snsId {
		&:before {
			content: "@";
			position: absolute;
			top: 50%;
			left: 16px;
			transform: translateY(-50%);
      font-size: 12px;
      line-height: 15px;
		}
	}

	&.hashTag {
		&:before {
			content: "#";
			position: absolute;
			top: 50%;
			left: 16px;
			transform: translateY(-50%);
      font-size: 12px;
      line-height: 15px;
		}
	}

	input {
		width: 100%;
		height: 100%;
		border: 2px solid ${({ theme }) => theme.colors.black};
		border-radius: 4px;
		padding: 16px;
    font-size: 12px;
    line-height: 15px;

		&.snsId {
			padding-left: 32px;
		}

		&.hashTag {
			padding-left: 26px;
		}
	}
`;

const DeleteBtn = styled.button`
	position: absolute;
	width: 20px;
	height: 20px;
	top: 50%;
	right: 16px;
	transform: translateY(-50%);
	background: url("/images/icons/delete.png") no-repeat 50% / contain;
	cursor: default;
`;

export { StyledBasicInput, InputWrapper, DeleteBtn };
export default {};
