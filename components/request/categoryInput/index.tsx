import React from "react";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../shared/state";
import CategoryChip from "../CategoryChip";

export const CATEGORY_TYPES = ["A", "B", "C", "D", "E"] as (
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
)[];

const CategoryInput = () => {
    const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);

    return (
        <div className="categoryContainer">
            <p>이벤트 종류 *</p>
            <ul>
                {CATEGORY_TYPES.map((category) => (
                    <li key={category}>
                        <CategoryChip
                            type={category}
                            selected={requestInputs.category === category}
                            handleClick={() =>
                                setRequestInputs({ ...requestInputs, category })
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CategoryInput;
