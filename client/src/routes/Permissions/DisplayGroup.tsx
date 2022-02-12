import React from 'react';
import { GroupWithFunctionalities } from '../../types';
import { DisplayPermission } from './DisplayPermission';

export const DisplayGroup = ({ group }: { group: GroupWithFunctionalities | undefined }) => {

  if (!group) {
    return null;
  }

  return (
    <div>
      <h2>{group.name}</h2>
      {group.functionalities.map(f => {
        return (
          <DisplayPermission key={f.id} permission={f} />
        );
      })}
    </div>
  );
};
