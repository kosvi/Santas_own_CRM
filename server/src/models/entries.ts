import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';
import { EntryAttributes } from '../types';

export class Entry extends Model<EntryAttributes> implements EntryAttributes {
  declare id?: number;
  declare userId: number;
  declare personId: number;
  declare niceness: number;
  declare description: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Entry.init({
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
  personId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'persons', key: 'id' }
  },
  niceness: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'entry'
});