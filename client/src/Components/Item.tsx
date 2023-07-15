/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import { Person } from '../types/types';
import { StateContext } from '../Context/context';

function Item({ item, index }: { item: Person; index: number }): JSX.Element {
  const [showCalendar, setShowCalendar] = useState(false);
  const { dispatch } = useContext(StateContext);
  const deleteFunc = (): void => {
    dispatch({ type: 'DELETE_PEOPLE', payload: item.id });
    console.log(item.id);
  };

  const openCalendar = (): void => {
    setShowCalendar(true);
  };

  const closeCalendar = (): void => {
    setShowCalendar(false);
  };

  return (
    <div className="item-container">
      <button
        type="button"
        className="toggle-calendar-btn"
        onClick={openCalendar}
      >
        <FontAwesomeIcon icon={faCalendar} />
      </button>
      <div className="name">
        {index + 1}. {item.name}
      </div>
      <button type="button" onClick={deleteFunc} className="delete-btn">
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {showCalendar && (
        <div className="modal">
          <div className="modal-content">
            <Calendar setShowCalendar={closeCalendar} item={item} />
          </div>
        </div>
      )}
      {!item.fromDate && !item.toDate && (
        <div className="warning">↑ Даты не выбраны</div>
      )}
    </div>
  );
}

export default Item;
