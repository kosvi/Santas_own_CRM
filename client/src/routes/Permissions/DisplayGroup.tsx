import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { groupsSelector } from '../../store';
import { FunctionalityWithPermission, GroupWithFunctionalities, Functionality } from '../../types';
import { DisplayPermission } from './DisplayPermission';
import { AddPermission } from './AddPermission';
import usePermission from '../../hooks/usePermission';

export const DisplayGroup = ({ groupId }: { groupId: number | null }) => {

  const { groups, functionalities } = useSelector(groupsSelector);
  const [group, setGroup] = useState<GroupWithFunctionalities | undefined>();
  const [allowWriteAccess] = usePermission();

  const order = (a: FunctionalityWithPermission, b: FunctionalityWithPermission) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
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
      {group.functionalities.map(f => {
        return (
          <DisplayPermission key={f.id} permission={f} group={group.id} />
        );
      })}
      {functionalities.length !== group.functionalities.length && <AddPermissionsList group={group} functionalities={functionalities} />}
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
