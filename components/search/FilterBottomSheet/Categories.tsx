import React from "react";
import StyledCategories from "./styles/categoriesStyle";
import type { CategoryDataType } from "../types";
import type { Dispatch, SetStateAction } from "react";

type CategoriesProps = {
	selectedCategories: CategoryDataType[];
	setSelectedCategories: Dispatch<SetStateAction<CategoryDataType[]>>;
};

const Categories = ({
	selectedCategories,
	setSelectedCategories,
}: CategoriesProps) => {
	const handleIconClick = (code: string) => {
		const newData = selectedCategories.map((c) => ({
			...c,
			selected: c.code === code ? !c.selected : c.selected,
		}));
		setSelectedCategories(newData);
	};

	return (
		<StyledCategories>
			<div className="title">
				<h3>선택하기</h3>
				<p>중복 선택 가능</p>
			</div>

			<div className="icons">
				{selectedCategories.map((c: CategoryDataType) => {
					const imgSrc = `/images/categories/${
						c.selected ? `${c.code}` : `${c.code}_disabled`
					}.svg`;

					return (
						<p key={c.code} className={c.selected ? "selected" : ""}>
							<img
								alt={c.code}
								src={imgSrc}
								onClick={() => handleIconClick(c.code)}
								role="presentation"
							/>
							{c.name}
						</p>
					);
				})}
			</div>
		</StyledCategories>
	);
};
export default Categories;
