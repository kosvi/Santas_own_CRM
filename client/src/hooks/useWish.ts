import { useDispatch, useSelector } from 'react-redux';
import { wishService } from '../services/wishService';
import { peopleSelector } from '../store';
import { logger } from '../utils/logger';
import { FullPerson, NewWish, Wish } from '../types';
import useNotification from './useNotification';
import { peopleActions } from '../store/people/peopleActions';

function useWish() {

  const { createNotification } = useNotification();
  const { people } = useSelector(peopleSelector);
  const dispatch = useDispatch();

  const addWish = async (wish: NewWish) => {
    try {
      const returnWish = await wishService.addWish(wish);
      if (!returnWish) {
        throw new Error('Failed to save the wish');
      }
      const id = wish.personId;
      if (people[id]) {
        const fullWish: Wish = {
          id: returnWish.id,
          description: returnWish.description,
          item: {
            id: returnWish.itemId,
            name: wish.itemName
          }
        };
        const fullPerson: FullPerson = { ...people[id] };
        fullPerson.wishes = fullPerson.wishes.concat([fullWish]);
        dispatch(peopleActions.updatePerson(fullPerson));
        createNotification(`${wish.itemName} added as a wish to ${fullPerson.name}`, 'msg');
      }
    } catch (error) {
      logger.logError(error);
      if (error instanceof Error) {
        createNotification(error.message, 'error');
      }
    }
  };

  return {
    addWish
  };
}

export default useWish;