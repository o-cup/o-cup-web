import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "../../shared/components";
import { StyledPosterView } from "./styles/posterViewStyle";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

type PosterProps = {
	images: string[];
	setPosterViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PosterView({ images, setPosterViewOpen }: PosterProps) {
	SwiperCore.use([Navigation]);

	const [swiper, setSwiper] = useState<SwiperCore>();
	const [zoomLevel, setZoomLevel] = useState(1);

	const [pageNum, setPageNum] = useState(1);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	/** 화면 scale 구하기 */
	useEffect(() => {
		function handleResize() {
			setZoomLevel(window.visualViewport.scale);
		}
		window.visualViewport.addEventListener("resize", handleResize);
		handleResize();
		return () =>
			window.visualViewport.removeEventListener("resize", handleResize);
	}, []);

	/** swiper 스와이프 방지 */
	useEffect(() => {
		if (swiper) {
			swiper.allowTouchMove = zoomLevel <= 1;
		}
	}, [zoomLevel, swiper]);

	return (
		<StyledPosterView>
			<div className="topIcons">
				<div className="imgPage">
					<span>
						{pageNum} / {images.length}
					</span>
				</div>
				<Icon
					name="poster-close"
					handleClick={() => setPosterViewOpen(false)}
				/>
			</div>

			<Swiper
				onSwiper={setSwiper}
				slidesPerView={1}
				navigation={zoomLevel <= 1}
				onSlideChange={(e) => setPageNum(e.activeIndex + 1)}
			>
				{images.map((img, i) => (
					<SwiperSlide key={img}>
						<img src={img} alt={img} />
					</SwiperSlide>
				))}
			</Swiper>
		</StyledPosterView>
	);
}

export default React.memo(PosterView);
