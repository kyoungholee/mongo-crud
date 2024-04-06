import { atom, useRecoilState } from 'recoil';

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: [],
});

console.log("selectedDateState", selectedDateState);

export const useSelectedDate = () => useRecoilState(selectedDateState);
