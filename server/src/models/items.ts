import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';
import { ItemAttributes } from '../types';

export class Item extends Model<ItemAttributes> implements ItemAttributes {
  declare id?: number;
  declare name: string;
}

Item.init({
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
  timestamps: false,
  modelName: 'item'
});