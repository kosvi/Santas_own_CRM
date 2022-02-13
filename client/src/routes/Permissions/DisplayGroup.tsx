import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { groupsSelector } from '../../store';
import { FunctionalityWithPermission, GroupWithFunctionalities } from '../../types';
import { DisplayPermission } from './DisplayPermission';

export const DisplayGroup = ({ groupId }: { groupId: number | null }) => {

  const { groups, functionalities } = useSelector(groupsSelector);
  const [group, setGroup] = useState<GroupWithFunctionalities | undefined>();

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
      // we will need to find a way to inject missing functionalities to 'sortedFunctionalities'
      // in case a group is missing a functionality or two(?)
    }
  }, [groupId, groups]);

  if (!groupId || !group) {
    return null;
  }

  return (
    <div>
      <h2>{group.name}</h2>
      {group.functionalities.map(f => {
        return (
          <DisplayPermission key={f.id} permission={f} group={group.id} />
        );
      })}
      <h2>Test</h2>
      {functionalities.map(f => {
        return (
          <div key={f.id}>{f.name} / {f.code}</div>
        );
      })}
    </div>
  );
};
