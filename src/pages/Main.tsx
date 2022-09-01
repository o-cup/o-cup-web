import React, { useEffect } from "react";
import { BiasList, EventList } from "../components/main";
import { StyledMain } from "../components/main/styles/mainStyle";
import Layout from "../shared/components/layout";

function Main() {

  // 이벤트 등록 session 정보 초기화
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <Layout page="main">
      <StyledMain>
        <BiasList />
        <EventList />
      </StyledMain>
    </Layout>
  );
}

export default Main;
