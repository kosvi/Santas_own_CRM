import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../services/authService';
import { authSelector } from '../../store';
import { authActions } from '../../store/auth/authActions';
import { logger } from '../../utils/logger';
import { parseNumber } from '../../utils/validators';

export const ChangeGroup = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [newGroup, setNewGroup] = useState<string>('');
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const allowStateUpdates = useRef(true);

  useEffect(() => {
    allowStateUpdates.current = true;
    return () => {
      allowStateUpdates.current = false;
    };
  });

  const handleMenuChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setNewGroup(event.currentTarget.value);
    setButtonEnabled(true);
  };

  const handleGroupChange = async () => {
    const newId = parseNumber(newGroup);
    if (!user || !newId) {
      return;
    }
    setLoading(true);
    const payload = {
      token: user.token,
      groupId: newId
    };
    try {
      const result = await authService.switchGroup(payload);
      if (result) {
        authService.storeUser(result);
        dispatch(authActions.loginUser(result));
      }
    } catch (error) {
      logger.logError(error);
    }
    if (allowStateUpdates.current) {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div></div>
    );
  }

  if (loading) {
    return (
      <div>
        Processing...
      </div>
    );
  }

  return (
    <div>
      <select onChange={handleMenuChange}>
        <option>choose group</option>
        {user.groups.map(g => {
          if (g.id === user.activeGroup) {
            return <option key={g.id} value={g.id} disabled>{g.name}</option>;
          }
          return <option key={g.id} value={g.id}>{g.name}</option>;
        })}
      </select>
      <button onClick={handleGroupChange} disabled={buttonEnabled ? false : true}>set group</button>
    </div>
  );
};