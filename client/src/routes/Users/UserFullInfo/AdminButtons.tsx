import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGroups from '../../../hooks/useGroups';
import useUsers from '../../../hooks/useUsers';
import { groupsSelector } from '../../../store';
import { UserWithGroups } from '../../../types';

export const AdminButtons = ({ user }: { user: UserWithGroups }) => {

  const { changeUserDisableStatus, changePassword } = useUsers();
  const { fetchAllGroups } = useGroups();
  const { groups } = useSelector(groupsSelector);
  const [updating, setUpdating] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

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
          <tr>
            <td>
              <button onClick={fetchAllGroups}>load groups</button>
              <select onChange={(event) => console.log(event.currentTarget.value)}>{groups.map(g => {
                return <option key={g.id} value={g.id}>{g.name}</option>;
              })}</select>
            </td>
            <td>
              <button>Add group</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};