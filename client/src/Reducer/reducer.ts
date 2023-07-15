import { State } from '../types/types';

export const initState: State = {
  peopleState: [],
};
export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'INIT_PEOPLE':
      return {
        ...state,
        peopleState: action.payload,
      };
    case 'ADD_PEOPLE':
      return {
        ...state,
        peopleState: [...state.peopleState, action.payload],
      };
    case 'DELETE_PEOPLE':
      return {
        ...state,
        peopleState: state.peopleState.filter((el) => el.id !== action.payload),
      };
    case 'CHANGE_DATE':
      return {
        ...state,
        peopleState: [...state.peopleState].map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              fromDate: action.payload.fromDate,
              toDate: action.payload.toDate,
            };
          }
          return el;
        }),
      };
    default:
      return state;
  }
};
