import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { PermissionAttributes } from '../types';

export class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
  declare id?: number;
  declare groupId: number;
  declare functionalityId: number;
  declare read: boolean;
  declare write: boolean;
}

Permission.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'groups', key: 'id' }
  },
  functionalityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'functionalities', key: 'id' }
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  write: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'permission'
});