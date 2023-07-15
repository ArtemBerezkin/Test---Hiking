/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import StateContext from '../Context/context';

function AddForm(): JSX.Element {
  const [input, setInput] = useState('');
  const { dispatch, state } = useContext(StateContext);
  const addFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input) {
      const newId =
        state.peopleState.length > 0
          ? state.peopleState[state.peopleState.length - 1].id + 1
          : 1;
      const newPerson = {
        id: newId,
        name: input,
        fromDate: undefined,
        toDate: undefined,
      };
      dispatch({
        type: 'ADD_PEOPLE',
        payload: newPerson,
      });
      const updatedPeopleState = [...state.peopleState, newPerson];
      localStorage.setItem('peopleState', JSON.stringify(updatedPeopleState));
      setInput('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={addFunc}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Введите имя"
        />
        <button type="submit">
          <span>
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
        </button>
      </form>
    </div>
  );
}
export default AddForm;
