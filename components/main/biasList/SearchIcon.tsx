import { useRouter } from "next/router";
import React from "react";
import { StyledBias } from "../styles/biasStyles";

function SearchIcon() {
	const router = useRouter();
	return (
		<StyledBias onClick={() => router.push("/search")}>
			<div id="search">
				<div>
					<img id="search" src="/images/icons/search.png" alt="search" />
				</div>
				<p>검색하기</p>
			</div>
		</StyledBias>
	);
}

export default SearchIcon;
