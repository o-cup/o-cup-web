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
			left: 10px;
			transform: translateY(-50%);
		}
	}

	&.hashTag {
		&:before {
			content: "#";
			position: absolute;
			top: 50%;
			left: 11px;
			transform: translateY(-50%);
			font-size: 16px;
		}
	}

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
`;

const DeleteBtn = styled.button`
	position: absolute;
	width: 20px;
	height: 20px;
	top: 50%;
	right: 8px;
	transform: translateY(-50%);
	background: url("/images/icons/delete.png") no-repeat 50% / contain;
	cursor: default;
`;

export { StyledBasicInput, InputWrapper, DeleteBtn };
export default {};
