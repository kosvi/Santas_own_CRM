import React, { useEffect, useRef, useState } from 'react';
import useUsers from '../../../hooks/useUsers';
import { UserWithGroups } from '../../../types';
import { AddGroupForm } from './AddGroupForm';
import usePermission from '../../../hooks/usePermission';

export const AdminButtons = ({ user }: { user: UserWithGroups }) => {

  const { changeUserDisableStatus, changePassword } = useUsers();
  const { allowWriteAccess } = usePermission();
  const [updating, setUpdating] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [currentGroup, setCurrentGroup] = useState<{id: number, name: string}>({ id: 0, name: '' });

  const allowStateUpdates = useRef(true);

  useEffect(() => {
    allowStateUpdates.current = true;
    return () => {
      allowStateUpdates.current = false;
    };
  });

  const updateDisableStatus = async () => {
    setUpdating(true);
    await changeUserDisableStatus(user.id, !user.disabled);
    if (allowStateUpdates.current) {
      setUpdating(false);
    }
  };

  const handlePasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === 'password') {
      setPassword(event.currentTarget.value);
    } else if (event.currentTarget.name === 'password2') {
      setPassword2(event.currentTarget.value);
    }
    setPasswordMessage('');
  };

  const handleChangePassword = async () => {
    if (password !== password2) {
      setPasswordMessage('Passwords don\'t match');
      return;
    }
    setUpdating(true);
    await changePassword(user.id, password);
    if (allowStateUpdates.current) {
      setUpdating(false);
      setPassword('');
      setPassword2('');
      setPasswordMessage('');
    }
  };

  if (updating) {
    return (
      <div>
        <h3>Updating...</h3>
      </div>
    );
  }

  return (
    <div>
      <h4>Admin tools</h4>
      <table>
        <tbody>
          <tr>
            <td>Account is {user.disabled ? 'disabled' : 'enabled'}</td>
            <td><button onClick={() => updateDisableStatus()}>{user.disabled ? 'enable' : 'disable'}</button></td>
          </tr>
          <tr>
            <td>
              <input type='password' value={password} name='password' placeholder='Password' onChange={handlePasswordInput} /><br />
              <input type='password' value={password2} name='password2' placeholder='Confirm password' onChange={handlePasswordInput} />
            </td>
            <td>
              {passwordMessage}<br />
              <button onClick={() => handleChangePassword()}>update password</button>
            </td>
          </tr>
          {allowWriteAccess('permissions') &&
          <tr>
            <td>
              <AddGroupForm setGroup={setCurrentGroup} />
            </td>
            <td>
              {currentGroup.name}<br />
              <button>Add group</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  );
};
