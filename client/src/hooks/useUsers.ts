import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/userService';
import { usersSelector } from '../store';
import { usersActions } from '../store/users/usersActions';
import { NewUser, UserWithGroups } from '../types';
import { logger } from '../utils/logger';
import useNotification from './useNotification';

function useUsers() {

  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const { createNotification } = useNotification();

  const fetchUsers = async (force = false) => {
    if (users.length < 1 || force) {
      try {
        const data = await userService.getUsers();
        dispatch(usersActions.setUsers(data));
      } catch (error) {
        logger.logError(error);
      }
    }
  };

  const updateUser = async (id: number) => {
    try {
      const data = await userService.getSingleUser(id);
      dispatch(usersActions.updateUser(data));
    } catch (error) {
      logger.logError(error);
    }
  };

  const addUser = async (user: NewUser) => {
    try {
      const data = await userService.addUser(user);
      const newUser: UserWithGroups = {
        ...data,
        groups: []
      };
      dispatch(usersActions.updateUser(newUser));
    } catch (error) {
      console.log(error);
      logger.logError(error);
      createNotification('failed to save new user', 'error');
    }
  };

  return {
    fetchUsers, updateUser, addUser
  };
}

export default useUsers;