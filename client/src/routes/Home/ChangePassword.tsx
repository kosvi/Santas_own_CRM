import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import useUsers from '../../hooks/useUsers';
import { authSelector } from '../../store';

export const ChangePassword = () => {

  const { user } = useSelector(authSelector);
  const { changePassword } = useUsers();
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const { createNotification } = useNotification();

  const handlePasswordChange = async () => {
    if (password !== password2) {
      createNotification('Passwords don\'t match!', 'error');
      return;
    }
    if (user) {
      setPassword('');
      setPassword2('');
      await changePassword(user.id, password);
    }
  };

  return (
    <div>
      <input placeholder='Password' type='password' value={password} onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} /><br />
      <input placeholder='Confirm password' type='password' value={password2} onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword2(event.currentTarget.value)} /><br />
      <button onClick={handlePasswordChange}>Update</button>
    </div>
  );
};