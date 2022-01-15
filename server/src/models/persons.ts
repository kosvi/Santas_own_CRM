import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { PersonAttributes } from '../types';

export class Person extends Model<PersonAttributes> implements PersonAttributes {
  declare id?: number;
  declare name: string;
  declare birthdate: Date;
  declare address: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Person.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'person'
});