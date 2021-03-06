import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { FunctionalityWithPermission, GroupFunctionality } from '../../types';
import { apiValidators } from '../../utils/apiValidators';
import { logger } from '../../utils/logger';

export const DisplayPermission = ({ permission, group }: { permission: FunctionalityWithPermission, group: number }) => {

  const dispatch = useDispatch();
  const [read, setRead] = useState<boolean>(permission.permission.read);
  const [write, setWrite] = useState<boolean>(permission.permission.write);
  const [readStyle, setReadStyle] = useState<string>('');
  const [writeStyle, setWriteStyle] = useState<string>('');
  const { createNotification } = useNotification();

  // set read & write status for permission
  useEffect(() => {
    setRead(permission.permission.read);
    setWrite(permission.permission.write);
  }, [permission]);

  // update button color
  useEffect(() => {
    if (read) {
      setReadStyle('PermissionValue PermissionTrue');
    } else {
      setReadStyle('PermissionValue PermissionFalse');
    }
    if (write) {
      setWriteStyle('PermissionValue PermissionTrue');
    } else {
      setWriteStyle('PermissionValue PermissionFalse');
    }
  }, [read, write]);

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
      createNotification('Permission updated', 'msg');
    } catch (error) {
      logger.logError(error);
      if (apiValidators.errorIsResponseError(error) && error.response?.data.error) {
        createNotification(error.response.data.error, 'error');
      }
    }
  };

  return (
    <div>
      <span className="PermissionTitle">{permission.name}</span>
      <div className="PermissionLine">
        read: <span className={readStyle} onClick={() => updatePermission('read')}>{(read ? 'true' : 'false')}</span>
        write: <span className={writeStyle} onClick={() => updatePermission('write')}>{(write ? 'true' : 'false')}</span>
      </div>
    </div>
  );
};
