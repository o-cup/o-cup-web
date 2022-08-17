import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHeader } from "../styles/layoutStyle";
import DateSelector from "./DateSelector";
import HeaderCalendar from "./HeaderCalendar";
import Icon from "../../Icon/Icons";

type HeaderProps = {
  dateSelector: boolean;
};

function Header({ dateSelector }: HeaderProps) {
  const navigate = useNavigate();
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  return (
    <StyledHeader>
      <div id="header">
        <Icon name="logo" handleClick={() => navigate("/")} />
        <div className="headerContents">
          {dateSelector && <DateSelector isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />}
          <Icon name="search" handleClick={() => navigate("/search")} />
        </div>
      </div>
      {isCalendarOpen && <HeaderCalendar setCalendarOpen={setCalendarOpen} />}
    </StyledHeader>
  );
}

export default Header;
