import { State } from '../types/types';

export const initState: State = {
  peopleState: [
    {
      id: 1,
      name: 'Maша',
      fromDate: new Date(2023, 6, 1),
      toDate: new Date(2023, 6, 7),
    },
    {
      id: 2,
      name: 'Олег',
      fromDate: new Date(2023, 6, 1),
      toDate: new Date(2023, 6, 9),
    },
  ],
};

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
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
