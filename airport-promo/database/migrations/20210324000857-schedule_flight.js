'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ScheduleFlight', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departureIata: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      arrivalIata: {
        type: Sequelize.STRING,
      },
      distance: {
        type: Sequelize.FLOAT,
      },
      minValue: {
        type: Sequelize.FLOAT
      },
      aircrafitModel: {
        type: Sequelize.STRING
      },
      endpointUrl: {
        type: Sequelize.STRING(200)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ScheduleFlight');
  }
};
