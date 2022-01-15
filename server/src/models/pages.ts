import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { PageAttributes } from '../types';

export class Page extends Model<PageAttributes> implements PageAttributes {
  declare id?: number;
  declare name: string;
}

Page.init({
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
  modelName: 'page'
});