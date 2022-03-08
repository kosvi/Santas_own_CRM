import moment from 'moment';
import React from 'react';
import { UserWithGroups } from '../../../types';

export const UserInfo = ({ user }: { user: UserWithGroups }) => {
  return (
    <div>
      <h4>Info summary</h4>
      <table className='commonTable'>
        <thead>
          <tr>
            <td>Property</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>id</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>{user.disabled ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <td>created at</td>
            <td>{moment(user.createdAt).format('DD.MM.YYYY')}</td>
          </tr>
          <tr>
            <td>updated at</td>
            <td>{moment(user.updatedAt).format('DD.MM.YYYY')}</td>
          </tr>
          <tr>
            <td>groups</td>
            <td>{user.groups.map(g => {
              return `${g.name} `;
            })}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};