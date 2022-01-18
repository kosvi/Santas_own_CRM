/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('people', {
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
    await queryInterface.createTable('entries', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'people', key: 'id' }
      },
      niceness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
    await queryInterface.createTable('items', {
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
    });
    await queryInterface.createTable('wishes', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'people', key: 'id' }
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'items', key: 'id' }
      },
      description: {
        type: DataTypes.TEXT
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('entries');
    await queryInterface.dropTable('wishes');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('people');
  }
};
