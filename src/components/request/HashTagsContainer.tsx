import React from "react";
import { useRecoilState } from "recoil";
import { requestHashTagsAtom } from "../../state/atoms";
import BasicInput from "./BasicInput";
import Icon from "../../shared/components/Icon/Icons";

const HashTagsContainer = () => {
  const [hashTags, setHashTags] = useRecoilState(requestHashTagsAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, hashTagId?: number) => {
    const { value } = e.currentTarget;

    // TODO: 띄어쓰기 입력 시 자동으로 _ 입력되도록 구현 검토
    const hashTagsData = hashTags.map((tag) => {
      if (tag.id === hashTagId) {
        return {
          ...tag,
          text: value
        };
      }
      return tag;
    });
    setHashTags(hashTagsData);
  };

  const handleAddHashTag = () => {
    if (hashTags.length > 3) return;
    setHashTags((prev) => [...prev, { id: hashTags.length + 1, text: "" }]);
  };

  const handleInputDelete = (e: React.MouseEvent, hashTagId?: number) => {
    const hashTagsData = hashTags.map((tag) => {
      if (tag.id === hashTagId) {
        return {
          ...tag,
          text: ""
        };
      }
      return tag;
    });
    setHashTags(hashTagsData);
  };

  return (
    <div className="hashTags">
      {hashTags.map((t) => (
        <BasicInput
          key={t.id}
          label="이벤트 해시태그"
          value={t.text}
          id="hashTag"
          placeholder={t.id === 1 ? "해피_오컵_데이" : ""}
          handleInputChange={(e) => handleInputChange(e, t.id)}
          handleInputDelete={(e) => handleInputDelete(e, t.id)}
          hideLabel={t.id !== 1}
        />
      ))}
      <div className="iconWrapper">
        <Icon name="plus-circle" handleClick={handleAddHashTag} />
      </div>
    </div>
  );
};

export default HashTagsContainer;