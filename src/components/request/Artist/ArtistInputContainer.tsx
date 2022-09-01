import React from "react";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../state/atoms";
import { StyledArtistContainer } from "./artistInputStyle";
import ArtistInput from "./ArtistInput";

const ArtistInputContainer = () => {
  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);

  const handleChangeArtist = (peopleId: number, bias: string, team: string, index: number) => {
    const artistInputsData = requestInputs.artist.map((artist) => {
      if (artist.id === index) {
        return {
          ...artist,
          peopleId,
          bias,
          team,
        };
      }
      return artist;
    });
    setRequestInputs({
      ...requestInputs,
      artist: artistInputsData,
    });
  };

  const handleClickAddArtist = () => {
    setRequestInputs({
      ...requestInputs,
      artist: [
        ...requestInputs.artist,
        {
          id: requestInputs.artist[requestInputs.artist.length - 1].id + 1,
          peopleId: 0,
          bias: "",
          team: "",
        },
      ],
    });
  };

  const handleDeleteArtist = (artistId: number) => {
    const data = requestInputs.artist.filter((artist) => artist.id !== artistId);
    setRequestInputs({
      ...requestInputs,
      artist: data,
    });
  };

  return (
    <StyledArtistContainer>
      {requestInputs.artist.map((artist) => (
        <ArtistInput key={artist.id} value={artist} handleChangeArtist={handleChangeArtist}
                     handleDeleteArtist={handleDeleteArtist} />
      ))}
      <button type="button" onClick={handleClickAddArtist}>
        다른 아티스트 추가하기
      </button>
    </StyledArtistContainer>
  );
};

export default ArtistInputContainer;