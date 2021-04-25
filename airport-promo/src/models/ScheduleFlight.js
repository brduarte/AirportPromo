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
      // define association here
    }
  }

  ScheduleFlight.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    departureIata: DataTypes.STRING,
    arrivalIata: DataTypes.STRING,
    distance: DataTypes.STRING,
    minValue: DataTypes.STRING,
    aircrafitModel: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ScheduleFlight',
  });
  return Vehicle;
};
