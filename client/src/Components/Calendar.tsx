/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { addDays, format, differenceInCalendarDays } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { Person, SetShowCalendar } from '../types/types';
import StateContext from '../Context/context';

function Calendar({
  setShowCalendar,
  item,
}: {
  setShowCalendar: SetShowCalendar;
  item: Person;
}): JSX.Element {
  const { dispatch, state } = useContext(StateContext);
  const pastMonth = item.fromDate;
  const daysDifference =
    item.toDate && item.fromDate
      ? differenceInCalendarDays(item.toDate, item.fromDate)
      : 0;
  const defaultSelected: DateRange = {
    from: item.fromDate,
    to: pastMonth ? addDays(pastMonth, daysDifference) : undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const changeDate = (): void => {
    const updatedItem = { ...item, fromDate: range?.from, toDate: range?.to };
    dispatch({
      type: 'CHANGE_DATE',
      payload: updatedItem,
    });

    setShowCalendar((prev) => !prev);

    const updatedPeopleState = state.peopleState.map((el) => {
      if (el.id === item.id) {
        return updatedItem;
      }
      return el;
    });

    localStorage.setItem('peopleState', JSON.stringify(updatedPeopleState));
  };

  let footer = (
    <>
      <p>Выбирает {item.name}</p>
      <p>Выберите первый день</p>
    </>
  );
  if (range?.from) {
    if (!range.to) {
      footer = (
        <>
          <p>Выбирает {item.name}</p>
          <p>{format(range.from, 'PPP')}</p>
        </>
      );
    } else if (range.to) {
      footer = (
        <>
          <p>Выбирает {item.name}</p>
          <p>
            {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
          </p>
          <button type="button" onClick={changeDate} className="calendar-btn">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      );
    }
  }
  return (
    <DayPicker
      id="test"
      mode="range"
      defaultMonth={pastMonth}
      selected={range}
      footer={footer}
      onSelect={setRange}
    />
  );
}

export default Calendar;
