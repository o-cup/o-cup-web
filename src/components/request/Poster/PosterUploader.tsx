import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { requestPosterUrlsAtom } from "../../../state/atoms";
import Icon from "../../../shared/components/Icon/Icons";
import { Poster, StyledPosterUpload } from "./posterUploadStyle";
import { Label } from "../styles/requestStyle";
import { uploadPoster } from "../../../apis";

const PosterUploader = () => {
  const [posterUrls, setPosterUrls] = useRecoilState(requestPosterUrlsAtom);

  useEffect(() => {
    const allHasUrl = posterUrls.every((poster) => poster.publicUrl);

    if (posterUrls.length === 3 && allHasUrl) {
      setPosterUrls([...posterUrls, { id: posterUrls.length + 1, publicUrl: "" }]);
    }
  }, [posterUrls]);

  const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { files } = e.target;
    if (!files) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onloadend = async () => {
      let publicUrl = "";
      await uploadPoster(files[0])
        .then((data) => {
          if (data) {
            publicUrl = data;
          }
        });

      const postersData = posterUrls.map((poster) => {
        if (poster.id === id) {
          return {
            ...poster,
            publicUrl
          };
        }
        return poster;
      });

      if (posterUrls.length === 4) {
        setPosterUrls(postersData);
        return;
      }
      // console.log([...postersData, { id: posterUrls.length + 1, publicUrl: "" }]);
      setPosterUrls([...postersData, { id: posterUrls.length + 1, publicUrl: "" }]);
    };
  };

  const handleDeletePoster = (id: number) => {
    const postersData = posterUrls
      .filter((poster) => poster.id !== id)
      .map((poster, index) => ({ ...poster, id: index + 1 }));

    setPosterUrls(postersData);
  };

  return (
    <StyledPosterUpload>
      <Label>이벤트 포스터 이미지</Label>

      <div className="posterWrapper">
        {posterUrls.map((p, index) => {
          const key = `poster ${index + 1}`;
          return (
            <Poster key={key}>
              {p.publicUrl ? (
                <div className="imgWrapper">
                  <img src={p.publicUrl} alt={key} />
                  <Icon name="delete-circle-white" handleClick={() => handleDeletePoster(p.id)} />
                </div>
              ) : (
                <label htmlFor="uploader">
                  <Icon name="plus-circle" />
                  <input type="file" id="uploader" accept="image/*" onChange={(e) => handleUploadClick(e, p.id)} />
                </label>
              )}
            </Poster>
          );
        })}
      </div>

      <p className="caption">최대 4장까지 업로드 가능합니다.</p>
    </StyledPosterUpload>
  );
};

export default PosterUploader;
