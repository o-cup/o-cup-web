import styled from "styled-components";

const StyledPosterUpload = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 6px;

	.posterWrapper {
		width: calc(100% + 40px);
		height: 160px;
		display: flex;
		gap: 10px;
		overflow-x: auto;
		overflow-y: hidden;
		-ms-overflow-style: none;
		scrollbar-width: none;
		margin: 0 -20px;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	> p.caption {
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #7a7a7a;
		margin-top: 4px;
	}
`;

const Poster = styled.div`
	width: 120px;
	min-width: 120px;
	height: 100%;
	border: 2px solid #000;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: center;
	align-items: center;

	&:first-child {
		margin-left: 20px;
	}

	&:last-child {
		margin-right: 20px;
	}

	input[type="file"] {
		display: none;
	}

	.imgWrapper {
		width: 100%;
		height: 100%;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		i.delete-circle-white {
			position: absolute;
			top: 3px;
			right: 3px;
		}
	}

	.imgWrapper::before {
		content: "";
		background: linear-gradient(#000000, transparent);
		opacity: 30%;
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
	}
`;

export { StyledPosterUpload, Poster };
