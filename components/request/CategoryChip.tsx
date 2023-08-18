import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { StyledCategoryChip } from "../../shared/components/categoryChip/style";
import { CATEGORY_DATA } from "../../shared/constants";
import { requestInputsAtom } from "../../shared/state";

type CategoryChipProps = {
    type: "A" | "B" | "C" | "D" | "E";
    handleClick?: (e: React.MouseEvent) => void;
    selected?: boolean;
    disabled?: boolean; // 클릭방지
};

export const CATEGORY_TITLE = {
    A: "카페",
    B: "꽃집",
    C: "음식점",
    D: "포토부스",
    E: "기타",
};

const CategoryChip = ({
    type,
    handleClick,
    selected,
    disabled,
}: CategoryChipProps) => {
    const [requestInputs] = useRecoilState(requestInputsAtom);
    const [chipOpacity, setChipOpacity] = useState(1);

    useEffect(() => {
        const opacityValue =
            requestInputs.category !== type && requestInputs.category !== ""
                ? 0.5
                : 1;

        setChipOpacity(opacityValue);
    }, [type, selected, disabled]);

    return (
        <StyledCategoryChip
            type={type}
            onClick={handleClick}
            className={selected ? "selected" : ""}
            opacity={chipOpacity}
            disabled={disabled}
        >
            <p>{CATEGORY_DATA[type]}</p>
            <span className="shadow" />
        </StyledCategoryChip>
    );
};

CategoryChip.defaultProps = {
    handleClick: null,
    selected: false,
    disabled: false,
};
export default CategoryChip;
