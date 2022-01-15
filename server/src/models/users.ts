// https://sequelize.org/master/manual/typescript.html

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { UserAttributes } from '../types/database';

export class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare username: string;
  declare password: string;
  declare disabled: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
});
