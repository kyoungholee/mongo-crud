import { atom, useAtom } from 'jotai';

export const selectedDateState = atom([]);
selectedDateState.debugLabel = 'selectedDateState'

console.log("selectedDateState", selectedDateState);

// const myNewSelector = selector({
//   key: 'myNewSelector',
//   get: ({get}) => get(atom),
//   set: ({set}, newValue) => set(atom, newValue),
// });

export const useSelectedDate = () => useAtom(selectedDateState);
