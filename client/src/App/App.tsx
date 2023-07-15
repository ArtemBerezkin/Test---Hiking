import React, { useMemo, useReducer } from 'react';
import './App.css';
import List from '../Components/List';
import '../Components/styles/mainStyles.scss';
import StateContext from '../Context/context';
import { initState, reducer } from '../Reducer/reducer';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <StateContext.Provider value={value}>
      <div className="App">
        <List />
      </div>
    </StateContext.Provider>
  );
}

export default App;
