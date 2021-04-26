'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule_flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departure_iata: {
        type: Sequelize.STRING
      },
      arrival_iata: {
        type: Sequelize.STRING
      },
      departure_state: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.FLOAT
      },
      min_value: {
        type: Sequelize.FLOAT
      },
      aircraft_model: {
        type: Sequelize.STRING
      },
      endpoint_url: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('schedule_flights');
  }
};
