import React from 'react';
import { useDispatch } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import { groupsService } from '../../services/groupsService';
import { groupsActions } from '../../store/groups/groupsActions';
import { Functionality, GroupFunctionality } from '../../types';
import { apiValidators } from '../../utils/apiValidators';
import { logger } from '../../utils/logger';

export const AddPermission = ({ functionality, group }: { functionality: Functionality, group: number }) => {

  const dispatch = useDispatch();
  const [createNotification] = useNotification();

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
      createNotification('Permission added successfully', 'msg');
    } catch (error) {
      if (apiValidators.errorIsResponseError(error) && error.response?.data.error) {
        createNotification(error.response.data.error, 'error');
      }
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
