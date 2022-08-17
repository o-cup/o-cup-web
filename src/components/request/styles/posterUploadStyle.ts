import styled from "styled-components";

const StyledPosterUpload = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 6px;

	.posterWrapper {
		width: 100%;
		height: 160px;
		display: flex;
		gap: 10px;
	}
`;

const Poster = styled.div`
	width: 120px;
	height: 100%;
	border: 2px solid #000;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: center;
	align-items: center;

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
