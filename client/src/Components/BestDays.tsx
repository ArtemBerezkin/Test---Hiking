import React, { useContext } from 'react';
import { HikingGroups } from '../types/types';
import { StateContext } from '../Context/context';

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
function BestDays(): JSX.Element {
  const { state } = useContext(StateContext);
  const people = state.peopleState;
  const hikingPeriods = people.map((person) => {
    const periodsForHiking: string[] = [];

    if (person.fromDate && person.toDate) {
      const startDate = new Date(person.fromDate);
      const endDate = new Date(person.toDate);
      while (
        endDate.getTime() - startDate.getTime() >=
        2 * 24 * 60 * 60 * 1000
      ) {
        const period = `${formatDate(startDate)}-${formatDate(
          addDays(startDate, 2)
        )}`;
        periodsForHiking.push(period);
        startDate.setDate(startDate.getDate() + 1);
      }
    }
    return {
      id: person.id,
      name: person.name,
      periodsForHiking,
    };
  });
  // console.log(hikingPeriods);
  const hikingGroups: HikingGroups[] = [];
  hikingPeriods.forEach((person1, i) => {
    hikingPeriods.slice(i + 1).forEach((person2) => {
      const commonPeriods = person1.periodsForHiking.filter((period) =>
        person2.periodsForHiking.includes(period)
      );

      commonPeriods.forEach((period) => {
        const peopleWhoHike = [person1.name, person2.name];
        const existingGroup = hikingGroups.find(
          (group) => group.period === period
        );

        if (existingGroup) {
          existingGroup.peopleWhoHike = Array.from(
            new Set([...existingGroup.peopleWhoHike, ...peopleWhoHike])
          );
        } else {
          const hikeId = hikingGroups.length + 1;
          hikingGroups.push({ hikeId, peopleWhoHike, period });
        }
      });
    });
  });
  // сортировка
  hikingGroups.sort((a, b) => b.peopleWhoHike.length - a.peopleWhoHike.length);
  if (hikingGroups.length === 0) {
    return (
      <>
        <h2>Возможные даты похода</h2> <p>Нет таких дат :(</p>
      </>
    );
  }
  return (
    <>
      <h2>Возможные даты похода</h2>
      <div className="hikingGroups">
        {hikingGroups.map((group, index) => (
          <div key={group.hikeId}>
            <p>
              {`${index + 1}. ${group.peopleWhoHike.join(', ')}: ${
                group.period
              }`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default BestDays;
