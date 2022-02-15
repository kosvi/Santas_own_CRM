import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePermission from '../../hooks/usePermission';
import { groupsService } from '../../services/groupsService';
import { groupsSelector } from '../../store';
import { groupsActions } from '../../store/groups/groupsActions';
import { Functionality } from '../../types';
import { logger } from '../../utils/logger';
import { DisplayGroup } from './DisplayGroup';
import { NewGroupForm } from './NewGroupForm';

export const Permissions = () => {

  const dispatch = useDispatch();
  const { groups } = useSelector(groupsSelector);
  const [group, setGroup] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [allowReadAccess, allowWriteAccess] = usePermission();

  useEffect(() => {
    const fetchAllFunctionalities = async () => {
      try {
        const functionalities = await groupsService.getFunctionalities();
        const sortedFunctionalities = [...functionalities].sort((a: Functionality, b: Functionality) => {
          return a.name > b.name ? 1 : (b.name > a.name ? -1 : 0);
        });
        dispatch(groupsActions.addFunctionalities(sortedFunctionalities));
      } catch (error) {
        logger.logError(error);
      }
    };
    fetchAllFunctionalities();
  }, []);

  const fetchAllGroups = async () => {
    try {
      const allGroups = await groupsService.getAllGroups();
      dispatch(groupsActions.addGroups(allGroups));
    } catch (error) {
      logger.logError(error);
    }
  };

  const fetchGroupByName = async () => {
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

  const loadGroups = async () => {
    if(name==='*') {
      await fetchAllGroups();
    } else {
      await fetchGroupByName();
    }
  };

  if(!allowReadAccess('permissions')) {
    return (
      <div>
        Access denied
      </div>
    );
  }

  return (
    <div>
      <input name="groupName" value={name} placeholder="search group" onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} />
      <button onClick={loadGroups}>load</button>
      <div>
        {groups.map(g => {
          return <div className="GroupNameDiv" key={g.id} onClick={() => setGroup(g.id)}>{g.name}</div>;
        })}
        {groups.length>0 && allowWriteAccess('permissions') && <div className="GroupNameDiv" onClick={() => setGroup(null)}>New Group</div>}
      </div>
      {group===null && allowWriteAccess('permissions') && <NewGroupForm />}
      {group!==null && <DisplayGroup groupId={group} />}
    </div>
  );
};
