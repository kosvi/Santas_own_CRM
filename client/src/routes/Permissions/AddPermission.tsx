import React from 'react';
import { useDispatch } from 'react-redux';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { Functionality, GroupFunctionality } from '../../types';
import { logger } from '../../utils/logger';

export const AddPermission = ({ functionality, group }: { functionality: Functionality, group: number }) => {

  const dispatch = useDispatch();

  const addPermission = async () => {
    const payload: GroupFunctionality = {
      groupId: group,
      functionalityId: functionality.id,
      read: false,
      write: false
    };
    try {
      const updatedGroup = await groupsService.addPermission(payload);
      dispatch(groupsActions.updateGroup(updatedGroup));
    } catch (error) {
      logger.logError(error);
    }
  };

  return (
    <div>
      <b>{functionality.name}</b><br />
      <button onClick={addPermission}>add permission</button>
    </div>
  );
};
