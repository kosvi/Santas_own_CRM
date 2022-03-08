import { groupsService } from '../services/groupsService';
import { groupsActions } from '../store/groups/groupsActions';
import useUsers from './useUsers';
import { useDispatch } from 'react-redux';
import { logger } from '../utils/logger';
import useNotification from './useNotification';

function useGroups() {

  const dispatch = useDispatch();
  const { createNotification } = useNotification();
  const { updateUser } = useUsers();

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

  const connectUserToGroup = async (userId: number, groupId: number) => {
    if(userId<=0 || groupId<=0) {
      return;
    }
    try {
      const result = await groupsService.connectUserToGroup(groupId, userId);
      await updateUser(result.userId);
    } catch (error) {
      logger.logError(error);
      createNotification('failed to connect user to group', 'error');
    }
  };

  return {
    fetchAllGroups, fetchGroupByName, connectUserToGroup
  };
}

export default useGroups;
