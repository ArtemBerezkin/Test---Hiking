import React, { useEffect, useMemo, useReducer } from 'react';
import './App.css';
import List from '../Components/List';
import '../Components/styles/mainStyles.scss';
import StateContext from '../Context/context';
import { initState, reducer } from '../Reducer/reducer';
import { Person } from '../types/types';

function App(): JSX.Element {
  const getInitialState = (): Person[] => {
    const storedState = localStorage.getItem('peopleState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Преобразование строковых значений в объекты даты
      return parsedState.map((person: Person) => ({
        ...person,
        fromDate: person.fromDate ? new Date(person.fromDate) : undefined,
        toDate: person.toDate ? new Date(person.toDate) : undefined,
      }));
    }
    return [];
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useEffect(() => {
    dispatch({ type: 'INIT_PEOPLE', payload: getInitialState() });
  }, []);

  return (
    <StateContext.Provider value={value}>
      <div className="App">
        <List />
      </div>
    </StateContext.Provider>
  );
}

export default App;
