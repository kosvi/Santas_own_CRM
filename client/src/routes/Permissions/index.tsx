import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupsService } from '../../services/groupsService';
import { groupsSelector } from '../../store';
import { groupsActions } from '../../store/groups/groupsActions';
import { GroupWithFunctionalities } from '../../types';
import { logger } from '../../utils/logger';
import { DisplayGroup } from './DisplayGroup';

export const Permissions = () => {

  const dispatch = useDispatch();
  const { groups } = useSelector(groupsSelector);
  const [group, setGroup] = useState<GroupWithFunctionalities | undefined>(undefined);
  const [name, setName] = useState<string>('');

  const fetchAllGroups = async () => {
    try {
      const allGroups = await groupsService.getAllGroups();
      dispatch(groupsActions.addGroups(allGroups));
    } catch (error) {
      logger.logError(error);
    }
  };

  const addGroupByName = async () => {
    if (name.length < 1) {
      return;
    }
    try {
      const group = await groupsService.getSingleGroup(name);
      dispatch(groupsActions.addGroups([group]));
    } catch (error) {
      logger.logError(error);
    }
  };

  return (
    <div>
      <input name="groupName" value={name} onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} />
      <button onClick={addGroupByName}>get single</button>
      <button onClick={fetchAllGroups}>get all</button>
      Hello Permissions!
      {groups.map(g => {
        return <div key={g.id} onClick={() => setGroup(g)}>{g.name}</div>;
      })}
      <DisplayGroup group={group} />
    </div>
  );
};