import React, { useEffect, useState } from "react";
import Icon from "../../shared/components/Icon/Icons";
import { Poster, StyledPosterUpload } from "./styles/posterUploadStyle";
import { Label } from "./styles/requestStyle";
import { uploadPoster } from "../../apis";

type InputProps = {
  setPosterUrls: React.Dispatch<React.SetStateAction<string[]>>;
};

const PosterUploader = ({ setPosterUrls }: InputProps) => {
  const [posters, setPosters] = useState([{ id: 1, url: "", publicUrl: "" }]);

  useEffect(() => {
    const allHasUrl = posters.every((poster) => poster.url);

    if (posters.length === 3 && allHasUrl) {
      setPosters([...posters, { id: posters.length + 1, url: "", publicUrl: "" }]);
    }
  }, [posters]);

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

      const data = reader.result as string;
      const postersData = posters.map((poster) => {
        if (poster.id === id) {
          return {
            ...poster,
            url: data,
            publicUrl
          };
        }
        return poster;
      });

      if (posters.length === 4) {
        setPosters(postersData);
        return;
      }
      console.log([...postersData, { id: posters.length + 1, url: "", publicUrl: "" }]);
      setPosters([...postersData, { id: posters.length + 1, url: "", publicUrl: "" }]);
    };
  };

  const handleDeletePoster = (id: number) => {
    const postersData = posters
      .filter((poster) => poster.id !== id)
      .map((poster, index) => ({ ...poster, id: index + 1 }));

    setPosters(postersData);
  };

  useEffect(() => {
    const urls = posters.map((p) => p.publicUrl).filter((p) => p !== "");

    setPosterUrls(urls);
  }, [posters]);

  return (
    <StyledPosterUpload>
      <Label>이벤트 포스터 이미지</Label>

      <div className="posterWrapper">
        {posters.map((p, index) => {
          const key = `poster ${index + 1}`;
          return (
            <Poster key={key}>
              {p.url ? (
                <div className="imgWrapper">
                  <img src={p.url} alt={key} />
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
