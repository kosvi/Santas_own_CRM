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
import useGroups from '../../hooks/useGroups';

export const Permissions = () => {

  const dispatch = useDispatch();
  const { groups } = useSelector(groupsSelector);
  const [group, setGroup] = useState<number | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const { allowReadAccess, allowWriteAccess } = usePermission();
  const { fetchAllGroups, fetchGroupByName } = useGroups();

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

  const loadGroups = async () => {
    if (searchKey === '*') {
      await fetchAllGroups();
    } else {
      await fetchGroupByName(searchKey);
    }
  };

  if (!allowReadAccess('permissions')) {
    return (
      <div>
        Access denied
      </div>
    );
  }

  return (
    <div>
      <input id="searchGroupInput" name="groupName" value={searchKey} placeholder="search group" onChange={(event: React.FormEvent<HTMLInputElement>) => setSearchKey(event.currentTarget.value)} />
      <button onClick={loadGroups}>load</button>
      <div id="groupList">
        {groups.map(g => {
          return <div className="GroupNameDiv" key={g.id} onClick={() => setGroup(g.id)}>{g.name}</div>;
        })}
        {groups.length > 0 && allowWriteAccess('permissions') && <div className="GroupNameDiv" onClick={() => setGroup(null)}>New Group</div>}
      </div>
      {group === null && allowWriteAccess('permissions') && <NewGroupForm />}
      {group !== null && <DisplayGroup groupId={group} reloadMethod={fetchGroupByName} />}
    </div>
  );
};
