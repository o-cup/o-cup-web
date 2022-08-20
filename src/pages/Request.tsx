import React, { useState } from "react";
import Layout from "../shared/components/layout";
import Entry from "../components/request/Entry";
import PreviewContent from "../components/request/PreviewContent";
import { StyledPreview, StyledRequest } from "../components/request/styles/requestStyle";
import BottomSheet from "../shared/components/BottomSheet";
import useMediaQuery from "../hooks/useMediaQuery";

// TODO: 장소 등록 header 컴포넌트로 렌더링 할 수 있도록 수정하기
// TODO: input value는 실수로 새로고침 시 사라지지 않도록 atom session으로 관리 고려
const Request = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (<>
    <Layout title="장소 등록">
      <StyledRequest>
        <Entry />
        <StyledPreview>
          <PreviewContent />
        </StyledPreview>
      </StyledRequest>
    </Layout>
    {isMobile &&
      <BottomSheet open={isBottomSheetOpen} setOpen={setBottomSheetOpen}
                   header="미리보기"
                   close
                   slider
                   buttons={{
                     title: "제출하기",
                     handleClick: () => console.log("zzz"),
                   }}>
        <div>
          <PreviewContent />
        </div>
      </BottomSheet>}
  </>);
};

export default Request;
