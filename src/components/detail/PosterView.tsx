import React from "react";
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

	return (
		<StyledPosterView>
			<Icons name="poster-close" handleClick={() => setPosterViewOpen(false)} />
			<Swiper
				slidesPerView={1}
				navigation
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{images.map((img) => (
					<SwiperSlide key={img}>
						<img src={img} alt={img} />
					</SwiperSlide>
				))}
			</Swiper>
		</StyledPosterView>
	);
}

export default PosterView;
