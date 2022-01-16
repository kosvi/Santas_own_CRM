import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { SessionAttributes } from '../types';

export class Session extends Model<SessionAttributes> implements SessionAttributes {
  declare id?: number;
  declare userId: number;
  declare token: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Session.init({
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
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session'
});
