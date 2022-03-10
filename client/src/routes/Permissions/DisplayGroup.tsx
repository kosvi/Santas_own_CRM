import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupsSelector } from '../../store';
import { FunctionalityWithPermission, GroupWithFunctionalities, Functionality } from '../../types';
import { DisplayPermission } from './DisplayPermission';
import { AddPermission } from './AddPermission';
import usePermission from '../../hooks/usePermission';
import { groupsService } from '../../services/groupsService';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import { groupsActions } from '../../store/groups/groupsActions';

interface ReloadMethod {
  (name: string): Promise<void>
}

export const DisplayGroup = ({ groupId, reloadMethod }: { groupId: number | null, reloadMethod: ReloadMethod }) => {

  const { groups, functionalities } = useSelector(groupsSelector);
  const [group, setGroup] = useState<GroupWithFunctionalities | undefined>();
  const { allowWriteAccess } = usePermission();
  const navigate = useNavigate();
  const { createNotification } = useNotification();
  const dispatch = useDispatch();

  const order = (a: FunctionalityWithPermission, b: FunctionalityWithPermission) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
  };

  const deleteCurrentGroup = async () => {
    if (groupId && window.confirm('Are you sure?')) {
      if (await groupsService.deleteGroup(groupId)) {
        // delete succeeded
        dispatch(groupsActions.removeGroup(groupId));
        createNotification('Group deleted', 'msg');
        navigate('/permissions');
      } else {
        // delete failed
        createNotification('Failed to delete group', 'error');
      }
    }
  };

  useEffect(() => {
    const result = groups.find(g => g.id === groupId);
    // We want to sort functionalities, so they always appear in same order
    if (result) {
      const sortedFunctionalities = [...result.functionalities].sort(order);
      const newGroup = { ...result, functionalities: sortedFunctionalities };
      setGroup(newGroup);
    }
  }, [groupId, groups]);

  if (!groupId || !group) {
    return null;
  }

  return (
    <div>
      <h2>Group: {group.name}</h2>
      <button onClick={() => reloadMethod(group.name)}>reload</button>
      {allowWriteAccess('permissions') && <button onClick={deleteCurrentGroup}>delete group</button>}
      {group.functionalities.map(f => {
        return (
          <DisplayPermission key={f.id} permission={f} group={group.id} />
        );
      })}
      {functionalities.length !== group.functionalities.length && allowWriteAccess('permissions') && <AddPermissionsList group={group} functionalities={functionalities} />}
    </div>
  );
};

// Just to make the code a bit prettier...
const AddPermissionsList = ({ group, functionalities }: { group: GroupWithFunctionalities, functionalities: Array<Functionality> }) => {
  return (
    <div>
      <h2>Missing permissions</h2>
      {functionalities.map(f => {
        if (!group.functionalities.find(gf => gf.id === f.id)) {
          return (
            <AddPermission key={f.id} functionality={f} group={group.id} />
          );
        }
      })}
    </div>
  );
};
