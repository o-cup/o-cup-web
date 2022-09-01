import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledEmptyMain } from "./styles/mainStyle";
import Button from "../../shared/components/Button";

type EmptyType = {
  size: string;
}

const EmptyDefault = ({ size = "default" }: EmptyType) => {

  const navigate = useNavigate();

  return (
    <StyledEmptyMain className={size}>
      {size === "small" ? <div>
          <p>찾고 있는 이벤트가 없나요?</p>
          <img src="/images/main_none_small.png" alt="empty" />
        </div> :
        <div>
          <img src="/images/main_none.png" alt="empty" />
        </div>}
      <Button customStyle={{ width: "280px", fontWeight: "bold" }}
              handleClick={() => navigate("/request")}>
        이벤트 등록하기
      </Button>
    </StyledEmptyMain>);
};

export default EmptyDefault;