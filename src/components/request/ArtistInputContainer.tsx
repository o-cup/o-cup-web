import React from "react";
import { useRecoilState } from "recoil";
import { requestArtistsAtom } from "../../state/atoms";
import { StyledArtistContainer } from "./styles/artistInputStyle";
import ArtistInput from "./ArtistInput";

const ArtistInputContainer = () => {
  const [artistInputs, setArtistInputs] = useRecoilState(requestArtistsAtom);

  const handleChangeArtist = (peopleId: number, bias: string, team: string, index: number) => {
    const artistInputsData = artistInputs.map((artist) => {
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
    setArtistInputs(artistInputsData);
  };

  const handleClickAddArtist = () => {
    setArtistInputs([
      ...artistInputs,
      {
        id: artistInputs[artistInputs.length - 1].id + 1,
        peopleId: 0,
        bias: "",
        team: "",
      },
    ]);
  };

  return (
    <StyledArtistContainer>
      {artistInputs.map((artist) => (
        <ArtistInput key={artist.id} value={artist} handleChangeArtist={handleChangeArtist} />
      ))}
      <button type="button" onClick={handleClickAddArtist}>
        다른 아티스트 추가하기
      </button>
    </StyledArtistContainer>
  )
};

export default ArtistInputContainer;