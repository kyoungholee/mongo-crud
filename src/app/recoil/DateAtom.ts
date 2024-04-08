import { atom, selector, useRecoilState } from 'recoil';

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: [],
});

console.log("selectedDateState", selectedDateState);

// const myNewSelector = selector({
//   key: 'myNewSelector',
//   get: ({get}) => get(atom),
//   set: ({set}, newValue) => set(atom, newValue),
// });

export const useSelectedDate = () => useRecoilState(selectedDateState);
