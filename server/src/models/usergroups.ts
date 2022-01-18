import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { UserGroupAttributes } from '../types';

export class UserGroup extends Model<UserGroupAttributes> implements UserGroupAttributes {
  declare id?: number;
  declare userId: number;
  declare groupId: number;
}

UserGroup.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'groups', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'usergroup'
});