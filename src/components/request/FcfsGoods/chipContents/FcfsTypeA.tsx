import React from "react";
import { StyledFcfsContentContainer } from "../fcfsGoodsInputStyle";
import { FcfsDataType, RequestFcfsType } from "../../requestType";
import GoodsChipCountInput from "../../GoodsChipInput/GoodsChipCountInput";

type FcfsProps = {
  firstCome: RequestFcfsType
  handleFirstComeData: (data: FcfsDataType[]) => void;
}

/** A: 매일 동일해요 */
const FcfsTypeA = ({ firstCome, handleFirstComeData }: FcfsProps) => {

  // 형식
  // data: [{ items: [{ id: 1, text: "", count: 0 }] }],
  const handleInputChange = (value: string, itemId: number, key: "text" | "count") => {
    if (firstCome?.data[0].items) {
      const itemsA = firstCome?.data[0].items.map((item) => {
        if (item.id === itemId) {
          if (key === "text") {
            return {
              ...item,
              text: value,
            };
          }
          if (key === "count") {
            console.log(value);
            return {
              ...item,
              count: parseInt(value, 10),
            };
          }
        }
        return item;
      });

      handleFirstComeData(
        [{
          ...firstCome.data[0],
          items: itemsA,
        }],
      );
    }
  };

  const handleAddChip = () => {
    const { items } = firstCome.data[0];
    handleFirstComeData(
      [{
        ...firstCome.data[0],
        items: [
          ...items,
          { id: items[items.length - 1].id + 1, text: "", count: 0 },
        ],
      }],
    );
  };

  const handleDeleteChip = (index: number) => {
    const { items } = firstCome.data[0];
    const updateItems = items.slice().filter((item)=> item.id !== index)
    handleFirstComeData(
      [{
        ...firstCome.data[0],
        items: updateItems,
      }],
    );
  };

  return (
    <StyledFcfsContentContainer>
      <div className="highlight">매일</div>
      <div className="chipContainer">
        {firstCome.data && firstCome.data[0]?.items.map((g) =>
          <GoodsChipCountInput key={g.id} index={g.id} value={g.text} count={g.count}
                               handleChange={handleInputChange}
                               handleDeleteChip={handleDeleteChip} />)
        }
        <button type="button" className="chipAddButton" onClick={handleAddChip}>
          <i className="plus" />
        </button>
      </div>
    </StyledFcfsContentContainer>
  );
};

export default FcfsTypeA;