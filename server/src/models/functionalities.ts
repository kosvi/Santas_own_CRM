import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { FunctionalityAttributes } from '../types';

export class Functionality extends Model<FunctionalityAttributes> implements FunctionalityAttributes {
  declare id?: number;
  declare name: string;
}

Functionality.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'functionality'
});