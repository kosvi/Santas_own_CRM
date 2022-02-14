import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { GroupWithFunctionalities } from '../../types';
import { logger } from '../../utils/logger';

export const NewGroupForm = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  const addNewGroup = async () => {
    try {
      const newGroup = await groupsService.addGroup(name);
      const fullGroup: GroupWithFunctionalities = { ...newGroup, functionalities: [] };
      dispatch(groupsActions.addGroups([fullGroup]));
      setName('');
    } catch (error) {
      logger.logError(error);
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
