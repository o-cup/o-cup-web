import React from "react";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../../state/atoms";
import { StyledFcfsContentContainer } from "../fcfsGoodsInputStyle";
import { FcfsDataType, ItemsCountType } from "../../requestType";
import GoodsChipCountInput from "../../GoodsChipInput/GoodsChipCountInput";

type FcfsContentProps = {
  dataObj: FcfsDataType;
  highlight: string;
}

const FcfsContent = ({ dataObj, highlight }: FcfsContentProps) => {
  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const { goods, goods: { firstCome } } = requestInputs;

  /* items 배열 변경 */
  const getUpdatedItem = (items: ItemsCountType[], itemId: number, value: string, name: "text" | "count") =>
    items.map((item) => {
      if (item.id === itemId) {
        if (name === "text") {
          return { ...item, text: value };
        }
        if (name === "count") {
          return { ...item, count: parseInt(value, 10) };
        }
      }
      return item;
    });

  /* data 배열 변경 */
  const handleFirstComeData = (data: FcfsDataType[]) => {
    const type = firstCome?.type;
    if (type === "A" || type === "B" || type === "C") {
      setRequestInputs({
        ...requestInputs,
        goods: {
          ...goods,
          firstCome: { type, data },
        },
      });
    }
  };

  const handleInputChange = (value: string, itemId: number, name: "text" | "count", dayKey: string | number | undefined) => {
    /* type A */
    if (!dayKey && firstCome?.data[0].items) {
      const updatedItems = getUpdatedItem(firstCome.data[0].items, itemId, value, name);
      handleFirstComeData([{ ...firstCome.data[0], items: updatedItems }]);
    }

    /* type B, C */
    if (dayKey) {
      const updatedData = firstCome?.data?.map((data) => {
        if (data.day === dayKey || data.key === dayKey) {
          const updatedItems = getUpdatedItem(data.items, itemId, value, name);
          return { ...data, items: updatedItems };
        }
        return data;
      });

      if (updatedData) {
        handleFirstComeData(updatedData);
      }
    }
  };

  const handleAddChip = (dayKey: string | number | undefined) => {
    /* type A */
    if (!dayKey && firstCome?.data[0].items) {
      const { items } = firstCome.data[0];
      if (items) {
        handleFirstComeData([{
          ...firstCome.data[0],
          items: [...items, { id: (items[items.length - 1]?.id || 0) + 1, text: "", count: 0 }],
        }]);
      }
    }

    /* type B, C */
    if (dayKey) {
      const updatedData = firstCome?.data?.map((data) => {
        if (data.day === dayKey || data.key === dayKey) {
          const { items } = data;
          const updatedItems = [...items, { id: (items[items.length - 1]?.id || 0) + 1, text: "", count: 0 }];
          return { ...data, items: updatedItems };
        }
        return data;
      });

      if (updatedData) {
        handleFirstComeData(updatedData);
      }
    }
  };

  const handleDeleteChip = (index: number, dayKey: string | number | undefined) => {
    /* type A */
    if (!dayKey && firstCome?.data[0].items) {
      const { items } = firstCome.data[0];
      const updateItems = items.slice().filter((item) => item.id !== index);
      handleFirstComeData(
        [{ items: updateItems }],
      );
    }

    /* type B, C */
    if (dayKey) {
      const updatedData = firstCome?.data?.map((data) => {
        if (data.day === dayKey || data.key === dayKey) {
          const { items } = data;
          const updatedItems = items.filter((item) => item.id !== index);
          return { ...data, items: updatedItems };
        }
        return data;
      });

      if (updatedData) {
        handleFirstComeData(updatedData);
      }
    }
  };

  return (
    <StyledFcfsContentContainer key={dataObj.day || dataObj.key}>
      <div className="highlight">{highlight}</div>
      <div className="chipContainer">
        {dataObj.items.map((g: ItemsCountType) =>
          <GoodsChipCountInput key={g.id} index={g.id} value={g.text} count={g.count}
                               dayKey={dataObj.day || dataObj.key}
                               handleChange={handleInputChange}
                               handleDeleteChip={handleDeleteChip} />)}
        <button type="button" className="chipAddButton" onClick={() => handleAddChip(dataObj.day || dataObj.key)}>
          <i className="plus" />
        </button>
      </div>
    </StyledFcfsContentContainer>
  );
};

export default FcfsContent;