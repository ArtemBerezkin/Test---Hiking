// импортируйте createContext из react
import { createContext } from 'react';
import { Context } from '../types/types';
import { initState } from '../Reducer/reducer';

// создайте исходное значение контекста с правильным типом
const initContext: Context = {
  state: initState,
  dispatch: () => {},
};

// создайте контекст
export const StateContext = createContext(initContext);
