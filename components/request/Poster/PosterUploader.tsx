import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tempPostersAtom } from "../../../state/atoms";
import Icons from "../../../shared/components/Icon/Icons";
import { Poster, StyledPosterUpload } from "./posterUploadStyle";
import { Label } from "../styles/requestStyle";

const PosterUploader = () => {
	const [tempPosters, setTempPosters] = useRecoilState(tempPostersAtom);

	useEffect(() => {
		const allHasUrl = tempPosters.every((poster) => poster.result);

		if (tempPosters.length === 3 && allHasUrl) {
			setTempPosters([...tempPosters, { id: tempPosters.length + 1, file: null, result: "" }]);
		}
	}, [tempPosters]);

	const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const { files } = e.target;
		if (!files) return;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);

		reader.onloadend = () => {
			const postersData = tempPosters.map((poster) => {
				if (poster.id === id) {
					return {
						...poster,
						file: files[0],
						result: `${reader.result}`,
					};
				}
				return poster;
			});

			if (tempPosters.length === 4) {
				setTempPosters(postersData);
				return;
			}
			setTempPosters([...postersData, { id: tempPosters.length + 1, file: null, result: "" }]);
		};
	};

	const handleDeletePoster = (id: number) => {
		const postersData = tempPosters
			.filter((poster) => poster.id !== id)
			.map((poster, index) => ({ ...poster, id: index + 1 }));

		setTempPosters(postersData);
	};

	return (
		<StyledPosterUpload>
			<Label>이벤트 포스터 이미지 *</Label>

			<div className="posterWrapper">
				{tempPosters.map((p, index) => {
					const key = `poster ${index + 1}`;
					return (
						<Poster key={key}>
							{p.result ? (
								<div className="imgWrapper">
									<img src={p.result} alt={key} />
									<Icons name="delete-circle-white" handleClick={() => handleDeletePoster(p.id)} />
								</div>
							) : (
								<label htmlFor="uploader">
									<Icons name="plus-circle" />
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
