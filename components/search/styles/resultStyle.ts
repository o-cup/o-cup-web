import styled from "styled-components";

export const StyledResult = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .menu {
        display: flex;
        justify-content: space-between;
        height: 24px;
        margin-bottom: 10px;

        p {
            line-height: 24px;
            font-size: 14px;
            color: ${({ theme }) => theme.colors.gray};
            width: 100%;
        }

        .icons {
            display: flex;
            width: fit-content;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

            i {
                min-width: 24px;
                max-width: 24px;
            }
        }
    }

    .chips {
        display: flex;
        gap: 10px;
        margin-bottom: 8px;
        overflow-x: scroll;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .events {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .request {
        height: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        img {
            width: 56px;
        }

        p {
            text-align: center;
            line-height: 30px;
        }
    }
`;

export default {};
