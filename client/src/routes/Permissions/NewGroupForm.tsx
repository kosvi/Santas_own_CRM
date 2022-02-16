import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { GroupWithFunctionalities } from '../../types';
import { apiValidators } from '../../utils/apiValidators';
import { logger } from '../../utils/logger';

export const NewGroupForm = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const { createNotification } = useNotification();

  const addNewGroup = async () => {
    try {
      const newGroup = await groupsService.addGroup(name);
      const fullGroup: GroupWithFunctionalities = { ...newGroup, functionalities: [] };
      dispatch(groupsActions.addGroups([fullGroup]));
      setName('');
      createNotification('New group added', 'msg');
    } catch (error) {
      logger.logError(error);
      if (apiValidators.errorIsResponseError(error) && error.response?.data.error) {
        createNotification(error.response.data.error, 'error');
      }
    }
  };

  return (
    <div id="NewGroupForm">
      <h2>Add new group</h2>
      <input type="text" name="name" onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} placeholder="name" />
      <button onClick={addNewGroup}>Save</button>
    </div>
  );
};
