export type Person = {
  id: number;
  name: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
};

export type Context = {
  state: State;
  dispatch: Function;
};

export type SetPeopleState = React.Dispatch<React.SetStateAction<Person[]>>;
export type SetShowCalendar = React.Dispatch<React.SetStateAction<boolean>>;
export type HikingGroups = {
  hikeId: number;
  peopleWhoHike: string[];
  period: string;
};

export type State = {
  peopleState: Person[];
};
