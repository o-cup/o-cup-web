import { atom } from "recoil";

const today = new Date();
const month: number = today.getMonth() + 1;
const currentMonthString: string = month < 10 ? `0${month}` : `${month}`;

const monthState = atom({
  key: "monthState",
  default: currentMonthString
});

const biasState = atom({
  key: "biasState",
  default: ""
});

export { monthState, biasState };
export default {};
