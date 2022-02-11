import React from 'react';
import { GroupWithFunctionalities } from '../../types';

export const DisplayGroup = ({ group }: { group: GroupWithFunctionalities | undefined }) => {

  if (!group) {
    return null;
  }

  return (
    <div>
      <div>{group.name}</div>
      {group.functionalities.map(f => {
        return (
          <div key={f.id}>
            {f.name}
          </div>
        );
      })}
    </div>
  );
};
