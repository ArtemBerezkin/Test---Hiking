import React, { useContext } from 'react';
import Item from './Item';
import AddForm from './AddForm';
import BestDays from './BestDays';
import StateContext from '../Context/context';

function List(): JSX.Element {
  const { state } = useContext(StateContext);
  const people = state.peopleState;

  return (
    <>
      <h1>Hiking Calculator</h1>
      <AddForm />
      <div className="list-container">
        <h2>Участники похода</h2>
        {people.length
          ? people.map((item, index) => (
              <Item item={item} index={index} key={item.id} />
            ))
          : 'Пока нет участников'}
      </div>
      <BestDays />
    </>
  );
}

export default List;
