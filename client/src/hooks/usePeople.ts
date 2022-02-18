import { useDispatch } from 'react-redux';
import { peopleService } from '../services/peopleService';
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
      const person = await peopleService.findPersonById(id);
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

  const addPerson = async (name: string, birthdate: string, address: string): Promise<Person | undefined> => {
    try {
      const person = await peopleService.addNewPerson({ name, birthdate, address });
      if (person) {
        const fullPerson: FullPerson = {
          ...person,
          wishes: [],
          entries: []
        };
        dispatch(peopleActions.addPeople([fullPerson]));
        createNotification(`${name} was added succesfully`, 'msg');
      }
      return person;
    } catch (error) {
      let message = 'failed to save new person';
      if (error instanceof Error) {
        message = `${message}: ${error.message}`;
      }
      createNotification(message, 'error');
      return undefined;
    }
  };

  return {
    findPeopleByName, findPersonById, addPerson
  };

}

export default usePeople;
