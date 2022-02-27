import { useDispatch, useSelector } from 'react-redux';
import { entryServices } from '../services/entryService';
import { peopleSelector } from '../store/people';
import { peopleActions } from '../store/people/peopleActions';
import { NewEntry } from '../types';
import { logger } from '../utils/logger';
import useNotification from './useNotification';

function useEntry() {

  const { createNotification } = useNotification();
  const { people } = useSelector(peopleSelector);
  const dispatch = useDispatch();

  const addEntry = async (entry: NewEntry) => {
    try {
      const fullEntry = await entryServices.addEntry(entry);
      if (fullEntry) {
        const id = fullEntry.personId;
        if (people[id]) {
          const fullPerson = { ...people[id] };
          fullPerson.entries = fullPerson.entries.concat([{
            id: fullEntry.id,
            userId: fullEntry.userId,
            niceness: fullEntry.niceness,
            description: fullEntry.description,
            createdAt: fullEntry.createdAt,
            updatedAt: fullEntry.updatedAt
          }]);
          dispatch(peopleActions.updatePerson(fullPerson));
        }
        createNotification(`Entry added: ${fullEntry.description}`, 'msg');
      } else {
        throw new Error('no result was returned');
      }
    } catch (error) {
      logger.logError(error);
      createNotification('failed to create new entry', 'error');
    }
  };

  return {
    addEntry
  };
}

export default useEntry;