'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleFlight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log(models)
      // define association here
    }
  }
  ScheduleFlight.init({
    departure_iata: DataTypes.STRING,
    arrival_iata: DataTypes.STRING,
    distance: DataTypes.FLOAT,
    departure_state: DataTypes.STRING,
    min_value: DataTypes.FLOAT,
    aircraft_model: DataTypes.STRING,
    endpoint_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScheduleFlight',
    tableName: 'schedule_flights',
  });
  return ScheduleFlight;
};
