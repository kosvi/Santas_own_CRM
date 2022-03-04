import axios from 'axios';
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

  const updateUser = async (id: number): Promise<UserWithGroups | undefined> => {
    try {
      const data = await userService.getSingleUser(id);
      dispatch(usersActions.updateUser(data));
      return data;
    } catch (error) {
      logger.logError(error);
      return undefined;
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
      logger.logError(error);
      if (axios.isAxiosError(error)) {
        createNotification(error.response?.data.error, 'error');
      } else {
        createNotification('failed to save new user', 'error');
      }
    }
  };

  const changeUserDisableStatus = async (userId: number, newStatus: boolean) => {
    try {
      if (newStatus) {
        const data = await userService.disableUser(userId);
        createNotification(data.msg, 'msg');
      } else {
        const data = await userService.enableUser(userId);
        createNotification(data.msg, 'msg');
      }
      await updateUser(userId);
    } catch (error) {
      logger.logError(error);
      if (axios.isAxiosError(error)) {
        createNotification(error.response?.data.error, 'error');
      } else {
        createNotification('failed to update user', 'error');
      }
    }
  };

  return {
    fetchUsers, updateUser, addUser, changeUserDisableStatus
  };
}

export default useUsers;