import { atom, useRecoilState } from 'recoil';

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: null,
});

export const useSelectedDate = () => useRecoilState(selectedDateState);
