import React, { useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { StyledPosterView } from "./styles/posterViewStyle";
import Icons from "../../shared/components/Icon/Icons";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

type PosterProps = {
	images: string[];
	setPosterViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PosterView({ images, setPosterViewOpen }: PosterProps) {
	SwiperCore.use([Navigation]);
	const [pageNum, setPageNum] = useState(1);

	return (
		<StyledPosterView>
			<Icons name="poster-close" handleClick={() => setPosterViewOpen(false)} />
			<div className="imgPage">
				<span>
					{pageNum} / {images.length}
				</span>
			</div>
			<Swiper slidesPerView={1} navigation onSlideChange={(e) => setPageNum(e.activeIndex + 1)}>
				{images.map((img, i) => (
					<SwiperSlide key={img}>
						<img src={img} alt={img} />
					</SwiperSlide>
				))}
			</Swiper>
		</StyledPosterView>
	);
}

export default PosterView;
