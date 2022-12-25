import React from "react";
import StyledCategories from "./styles/categoriesStyle";
import type { CategoryDataType } from "../types";
import type { Dispatch, SetStateAction } from "react";

type CategoriesProps = {
	categories: CategoryDataType[];
	setCategories: Dispatch<SetStateAction<CategoryDataType[]>>;
};

const Categories = ({ categories, setCategories }: CategoriesProps) => {
	const handleIconClick = (code: string) => {
		const newData = categories.map((c) => ({
			...c,
			selected: c.code === code ? !c.selected : c.selected,
		}));
		setCategories(newData);
	};

	return (
		<StyledCategories>
			<div className="title">
				<h3>선택하기</h3>
				<p>중복 선택 가능</p>
			</div>

			<div className="icons">
				{categories.map((c: CategoryDataType) => {
					const imgSrc = `/images/categories/${
						c.selected ? `${c.code}` : `${c.code}_disabled`
					}.png`;

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
