const {ScheduleFlight} = require('../models')

async function getHigherPrices(limit) {
  try {
    return await ScheduleFlight.findAll({
      order: [
        ['min_value', 'DESC']
      ],
      limit: limit
    })
  } catch (error) {
    throw error
  }
}

async function getStateWithMoreAirports(){
  try {
    return await ScheduleFlight.count({
      attributes: ['departure_state'],
      group: 'departure_state',
      order: [
        ['min_value', 'DESC']
      ],
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getHigherPrices,
  getStateWithMoreAirports
}
