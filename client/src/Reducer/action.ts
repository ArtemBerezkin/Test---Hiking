import { Person } from '../types/types';

type Action =
  | { type: 'ADD_PEOPLE'; payload: Person }
  | { type: 'DELETE_PEOPLE'; payload: number }
  | { type: 'CHANGE_DATE'; payload: Person };

export default Action;
