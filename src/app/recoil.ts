import { atom, useRecoilState } from 'recoil';

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: null,
});

console.log("selectedDateState", selectedDateState);

export const useSelectedDate = () => useRecoilState(selectedDateState);
