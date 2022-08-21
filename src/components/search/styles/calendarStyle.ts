import styled from "styled-components";

export const StyledCalendar = styled.div`
	width: 100%;

	background-color: ${({ theme }) => theme.colors.primary};

	.rdrMonth {
		background-color: ${({ theme }) => theme.colors.white};
		padding: 5px 10px 10px 10px;
	}

	.rdrWeekDays {
		height: 37px;
	}

	.rdrDays > button {
		height: 34px;
	}

	.submit {
		height: 64px;
		display: flex;
		align-items: center;
		font-size: 14px;

		p {
			width: 70%;
			text-align: center;
		}

		button {
			background-color: #000;
			color: #fff;
			font-weight: bold;
			border-radius: 30px;
			width: 63px;
			height: 36px;
			margin: 0 auto;
		}
	}
`;

export default {};
