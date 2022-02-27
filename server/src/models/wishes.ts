import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';
import { WishAttributes } from '../types';

export class Wish extends Model<WishAttributes> implements WishAttributes {
  declare id?: number;
  declare personId: number;
  declare itemId: number;
  declare description: string;
}

Wish.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  personId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'people', key: 'id' }
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'items', key: 'id' }
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'wish'
});