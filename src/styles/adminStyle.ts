import styled from "styled-components";

const StyledAdmin = styled.div`
  div.adminContainer {
    padding: 20px;
  }

  h1 {
    margin-bottom: 32px;
    font-weight: 600;
  }

  label {
    display: block;
    margin-bottom: 32px;
    
    h4 {
      font-weight: 500;
    }
    
    h4.required:after {
      content: "*";
      color: red;
    }
    
    span.help {
      display: block;
      font-size: 12px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0.1);
      padding: 8px;
      border-radius: 8px;
      margin-top: 8px;
      white-space: pre;
    }

    .goodsPreview {
      display: block;
      font-size: 14px;
      background: #f5eeb7;
      padding: 8px;
      border-radius: 8px;
      margin-top: 8px;
      white-space: pre;

      p {
        margin-bottom: 8px;
      }
    }

    input,
    textarea {
      //display: block;
      width: 100%;
      margin-top: 8px;
      padding: 8px;
    }

    .inputContainer {
      display: flex;
      margin-top: 8px;

      input {
        margin: 0;
        width: 100%;
      }

      input:not(:first-child) {
        margin-left: 4px;
      }

      button {
        margin-left: 4px;
        padding: 8px;
      }
    }

    .goodsContainer {
      margin-top: 8px;
      font-size: 14px;

      border: 1px solid #000000;
      border-radius: 8px;
      padding: 16px;

      label {
        margin-bottom: 12px;
      }

      .radioContainer {
        margin-bottom: 24px;

        input[type="radio"] {
          width: auto;
        }

      }

      button.goodsSubmitBtn {
        width: 100%;
      }
    }
  }

  .submitBtn{
    width: 100%;
  }
`;

export { StyledAdmin };
export default {};
