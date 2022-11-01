import React from "react";
import { CATEGORY_DATA } from "../../../shared/constants";
import StyledCategories from "./styles/categoriesStyle";
import type { CategoriesStateType } from "../types";
import type { Dispatch, SetStateAction } from "react";

type CategoriesProps = {
	categories: CategoriesStateType;
	setCategories: Dispatch<SetStateAction<CategoriesStateType>>;
};

const Categories = ({ categories, setCategories }: CategoriesProps) => {
	const handleIconClick = (category: string) => {
		setCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	return (
		<StyledCategories>
			<div className="title">
				<h3>선택하기</h3>
				<p>중복 선택 가능</p>
			</div>

			<div className="icons">
				{Object.keys(categories).map((c) => {
					const name = CATEGORY_DATA[c];
					const imgSrc = `/images/categories/${
						categories[c] ? `${c}` : `${c}_disabled`
					}.png`;

					return (
						<p key={c} className={categories[c] ? "selected" : ""}>
							<img
								alt={c}
								src={imgSrc}
								onClick={() => handleIconClick(c)}
								role="presentation"
							/>
							{name}
						</p>
					);
				})}
			</div>
		</StyledCategories>
	);
};
export default Categories;
