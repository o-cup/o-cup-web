import React, { useEffect, useState } from "react";
import Icon from "../../shared/components/Icon/Icons";
import { Poster, StyledPosterUpload } from "./styles/posterUploadStyle";
import { Label } from "./styles/requestStyle";

const PosterUploader = () => {
	const [posters, setPosters] = useState([{ id: 1, url: "" }]);

	useEffect(() => {
		const allHasUrl = posters.every((poster) => poster.url);

		if (posters.length === 2 && allHasUrl) {
			setPosters([...posters, { id: posters.length + 1, url: "" }]);
		}
	}, [posters]);

	const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const { files } = e.target;
		if (!files) return;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);

		reader.onloadend = () => {
			const data = reader.result as string;
			const postersData = posters.map((poster) => {
				if (poster.id === id) {
					return {
						...poster,
						url: data,
					};
				}
				return poster;
			});

			if (posters.length === 3) {
				setPosters(postersData);
				return;
			}
			setPosters([...postersData, { id: posters.length + 1, url: "" }]);
		};
	};

	const handleDeletePoster = (id: number) => {
		const postersData = posters
			.filter((poster) => poster.id !== id)
			.map((poster, index) => ({ ...poster, id: index + 1 }));

		setPosters(postersData);
	};

	return (
		<StyledPosterUpload>
			<Label>포스터 업로드</Label>

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
		</StyledPosterUpload>
	);
};

export default PosterUploader;
