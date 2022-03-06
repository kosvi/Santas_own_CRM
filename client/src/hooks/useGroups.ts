import { groupsService } from '../services/groupsService';
import { groupsActions } from '../store/groups/groupsActions';
import { useDispatch } from 'react-redux';
import { logger } from '../utils/logger';
import useNotification from './useNotification';

function useGroups() {

  const dispatch = useDispatch();
  const { createNotification } = useNotification();

  const fetchAllGroups = async () => {
    try {
      const allGroups = await groupsService.getAllGroups();
      dispatch(groupsActions.addGroups(allGroups));
    } catch (error) {
      logger.logError(error);
    }
  };

  const fetchGroupByName = async (name: string) => {
    if (name.length < 1) {
      return;
    }
    try {
      const group = await groupsService.getSingleGroup(name);
      dispatch(groupsActions.addGroups([group]));
    } catch (error) {
      logger.logError(error);
      createNotification(`no group found with name '${name}'`, 'error');
    }
  };

  return {
    fetchAllGroups, fetchGroupByName
  };
}

export default useGroups;