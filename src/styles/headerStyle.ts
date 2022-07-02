import styled from "styled-components";

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > .date_selector {
        display: flex;
        align-items: center;
        font-size: 24px;
        line-height: 30px;
        font-weight: 700;

        > p {
            margin: 0 10px;
        }

        > button {
            width: 24px;
            height: 24px;
            background: #FFFFFF;
            border: 1px solid #000000;
            border-radius: 50%;
            padding: 0;
            position: relative;
            cursor: pointer;
        
            &:last-child {
                transform: rotate(180deg);
            }

            > svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-65%, -50%);
            }
        }
    }
`;

export { StyledHeader };
export default {};
