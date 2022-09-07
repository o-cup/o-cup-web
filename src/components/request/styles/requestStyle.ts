import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

const StyledCheckEvent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
  gap: 64px;
  padding: 32px 20px;
  margin: 0 auto;
  
  > div.checkNotice {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 12px;
    
    > img {
      width: 24px;
      height: 31px;
    }
    
    > p {
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #000000;
    }
  }
  
  > div.btnContainer {
    width: 100%;
    
    &.disabled {
      opacity: 50%;
      pointer-events: none;
    }
  }
`

const StyledEntry = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	padding: 32px 20px;

	@media ${({ theme }) => theme.device.mobile} {
		width: 100%;
	}

	.notice {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 12px;
		width: 100%;
		font-weight: 400;

		p:first-child {
			width: 140px;
			height: 28px;
			background-color: ${({ theme }) => theme.colors.black};
			color: ${({ theme }) => theme.colors.white};
			font-weight: 700;
			border-radius: 30px;
			text-align: center;
			line-height: 28px;
		}

		p:not(:first-child) {
			line-height: 16px;
		}

		b {
			font-weight: 700;
		}
	}

	.inputsWrapper {
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 100%;
	}

	> .ctaContainer {
		display: flex;
		width: 100%;
		gap: 20px;
		margin-top: 30px;

		@media ${({ theme }) => theme.device.desktop} {
			> button:first-child {
				display: none;
			}
		}
	}
`;

const Label = styled.label<{ hideLabel?: boolean }>`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	position: relative;
	display: ${(props) => (props.hideLabel ? "none" : "")};
`;

const StyledPreview = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	padding: 14px 0;

	@media ${({ theme }) => theme.device.mobile} {
		display: none;
	}

	.previewContent {
		width: 100%;
	}
`;

const StyledRequestModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	border: 2px solid #000;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 4px;
	padding: 20px;

	> h4 {
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
	}

	> p {
		margin-top: 8px;
		font-weight: 500;
		font-size: 14px;
		line-height: 19px;
	}

	.modalBtnContainer {
		display: flex;
		gap: 12px;
		margin-top: 20px;

		> button {
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 30px;
			box-shadow: 0 4px 0 #000000;
			font-weight: 400;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			padding: 6px 12px;
      width: 116px;

			&.alertBtn {
				width: 72px;
			}
		}
	}
`;

const StyledDuplicatedModal = styled.div`
  width: 100%;
	border: none;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 4px;
	padding: 40px 14px;
  text-align: center;

	> p {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
	}

	.modalBtnContainer {
		display: flex;
		gap: 12px;
		margin-top: 40px;
    justify-content: center;
	}
`;

const StyledDuplicatedEvent = styled.div`
	height: 174px;
	border: 2px solid #000;
	padding: 10px;
	display: flex;
	gap: 10px;
	position: relative;
	background-color: #fff;
	box-shadow: 4px 4px 0 #000000;
	width: 100%;
	cursor: pointer;
  margin-top: 40px;
  
	img {
		width: 104px;
		height: 100%;
		object-fit: cover;
	}

	> div {
		display: flex;
		flex-direction: column;
		width: 170px;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h2 {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
			}
		}

		.biases {
			display: flex;
			gap: 5px;
      margin-top: 6px;
      margin-bottom: 16px;
		}

		.extraInfo {
      width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
      overflow: hidden;

			p {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
				color: ${({ theme }) => theme.colors.gray};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

				svg {
					margin-right: 5px;
          min-width: 14px;
				}
			}
		}
	}
`;

export { StyledRequest, StyledCheckEvent, StyledEntry, StyledPreview, Label, StyledRequestModal, StyledDuplicatedModal, StyledDuplicatedEvent };
export default {};
