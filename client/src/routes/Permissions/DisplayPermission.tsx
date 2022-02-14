import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { FunctionalityWithPermission, GroupFunctionality } from '../../types';
import { logger } from '../../utils/logger';

export const DisplayPermission = ({ permission, group }: { permission: FunctionalityWithPermission, group: number }) => {

  const dispatch = useDispatch();
  const read = permission.permission.read ? 'true' : 'false';
  const write = permission.permission.write ? 'true' : 'false';

  const updatePermission = async (property: 'read' | 'write') => {
    const payload: GroupFunctionality = {
      groupId: group,
      functionalityId: permission.id,
      read: property === 'read' ? !permission.permission.read : permission.permission.read,
      write: property === 'write' ? !permission.permission.write : permission.permission.write
    };
    try {
      const updatedGroup = await groupsService.updatePermission(payload);
      dispatch(groupsActions.updateGroup(updatedGroup));
    } catch (error) {
      logger.logError(error);
    }
  };

  return (
    <div>
      <span className="PermissionTitle">{permission.name}</span>
      <div className="PermissionLine">
        read: <span className="PermissionValue {(read==='read' ? PermissionTrue : PermissionFalse)}" onClick={() => updatePermission('read')}>{read}</span> write: <span className="PermissionValue" onClick={() => updatePermission('write')}>{write}</span>
      </div>
    </div>
  );
};
