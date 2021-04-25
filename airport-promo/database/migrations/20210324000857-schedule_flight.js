'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule_flight', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departure_iata: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      arrival_iata: {
        type: Sequelize.STRING,
      },
      distance: {
        type: Sequelize.FLOAT,
      },
      minValue: {
        type: Sequelize.FLOAT
      },
      aircrafit_model: {
        type: Sequelize.STRING
      },
      endpoint_url: {
        type: Sequelize.STRING(200)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedule_flight');
  }
};
