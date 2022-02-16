import { useDispatch, useSelector } from 'react-redux';
import { peopleService } from '../services/peopleService';
import { peopleSelector } from '../store/people';
import { peopleActions } from '../store/people/peopleActions';
import { FullPerson, Person } from '../types';
import { logger } from '../utils/logger';
import useNotification from './useNotification';

function usePeople() {

  const dispatch = useDispatch();
  const { createNotification } = useNotification();

  const findPeopleByName = async (name: string): Promise<Array<Person>> => {
    try {
      const newPeople = await peopleService.findPeople(name);
      const newFullPeople: Array<FullPerson> = newPeople.map(np => {
        return {
          ...np,
          entries: [],
          wishes: []
        };
      });
      dispatch(peopleActions.addPeople(newFullPeople));
      return newPeople;
    } catch (error) {
      logger.logError(error);
      createNotification('encountered error while trying to load people from api', 'error');
      return [];
    }
  };

  const findPersonById = async (id: number): Promise<FullPerson | undefined> => {
    try {
      const person = await peopleService.finfPersonById(id);
      if (person) {
        dispatch(peopleActions.updatePerson(person));
      }
      return person;
    } catch (error) {
      logger.logError(error);
      createNotification('failed to load person', 'error');
      return undefined;
    }
  };

  return {
    findPeopleByName, findPersonById
  };

}

export default usePeople;