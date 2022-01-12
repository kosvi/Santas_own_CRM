import { DataTypes } from 'sequelize';

interface QueryInterface {
  createTable: (arg0: string, arg1: {
    id: {
      type: DataTypes.IntegerDataTypeConstructor;
      primaryKey: boolean;
      autoIncrement: boolean;
    };
    username: {
      type: DataTypes.StringDataTypeConstructor;
      allowNull: boolean;
    };
    password: {
      type: DataTypes.StringDataTypeConstructor;
      allowNull: boolean;
    };
    name: {
      type: DataTypes.StringDataTypeConstructor;
      allowNull: boolean;
    };
    created_at: {
      type: DataTypes.DateDataTypeConstructor;
      allowNull: boolean;
    };
    updated_at: {
      type: DataTypes.DateDataTypeConstructor;
      allowNull: boolean;
    };
  }) => unknown;
  dropTable: (arg0: string) => unknown;
}

const migration = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  }
};

export default migration;