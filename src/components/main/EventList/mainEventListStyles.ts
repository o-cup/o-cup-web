import styled from "styled-components";

export const StyledMainEvents = styled.section`
	display: flex;
	flex-direction: column;
	gap: 40px;

	> div {
		display: flex;
		flex-direction: column;
		gap: 20px;

		> p {
			font-weight: 700;
			font-size: 16px;
			line-height: 20px;
			padding: 0 20px;
		}
	}
`;

export const StyledMainLists = styled.ul`
	display: flex;
	gap: 20px;
	padding-bottom: 4px; // 그림자 표현
	overflow-x: auto;
	overflow-y: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}

	&::after {
		content: "";
		border-right: 20px solid transparent;
	}
`;

export const StyledMainListItem = styled.li`
	background: ${(props) => props.theme.colors.white};
	border: 2px solid #000000;
	padding: 16px;
	position: relative;
	box-shadow: 4px 4px 0 #000000;
	cursor: pointer;
	width: 214px;
	max-width: 214px;
	min-width: 214px;

	&:first-child {
		margin-left: 20px;
	}

	.imgContainer {
		> .lazy-image {
			width: 176px;
			height: 235px;

			img {
				width: 176px;
				height: 235px;
				object-fit: cover;
				object-position: 90% 10%;
				vertical-align: center;
			}

			img.error {
				object-position: top;
			}
		}
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		> p {
			font-size: 20px;
			line-height: 50px;
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			> span {
				font-size: 20px;
				line-height: 50px;
				font-weight: 700;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 4px;

		> li {
			width: 100%;
			color: ${({ theme }) => theme.colors.gray};
			font-size: 14px;
			line-height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;

			> p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		i,
		svg {
			margin-right: 4px;
			width: 16px;
			min-width: 16px;
		}
	}
`;

export default {};
