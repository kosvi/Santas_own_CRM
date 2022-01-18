import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { GroupAttributes } from '../types';

export class Group extends Model<GroupAttributes> implements GroupAttributes {
  declare id?: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Group.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'group'
});