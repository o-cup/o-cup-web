import styled from "styled-components";

export const StyledTwitterInfo = styled.div`
    position: relative;
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;

    .account {
        display: flex;
        align-items: center;
        width: 100%;
        background: ${({ theme }) => theme.colors.white};
        border: 2px solid #000000;
        border-radius: 30px;
        position: relative;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        margin-bottom: 10px;

        > button {
            flex: 1 1 50%;
            display: flex;
            align-items: center;
            background: none;
            padding: 16px;

            > span {
                font-family: "Montserrat", "Noto Sans", sans-serif;
                width: 100%;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #000;
            }
        }
    }

    .hashTags {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        flex-wrap: wrap;
        display: flex;
        gap: 10px;
        margin-top: 10px;
        margin-bottom: 20px;

        p {
            display: block;
            background-color: black;
            color: white;
            padding: 4px 8px;
            font-weight: bold;
            border-radius: 1px;
            min-width: fit-content;
            cursor: pointer;
        }
    }
`;

export default {};
