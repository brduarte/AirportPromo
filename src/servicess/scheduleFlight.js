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

async function getStateWithMoreAirports() {
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

async function getScheduleDetailFlight() {
  try {

    let departureIatas = await ScheduleFlight.findAll({
      attributes: ['departure_iata'],
      group: 'departure_iata'
    })

    for (const departureIata of departureIatas) {
      departureIata.min_distance = await ScheduleFlight.findOne( {
        where: {
          departure_iata: departureIata.departure_iata,
        },
        order: [
          ['distance','ASC']
        ]
      })

      departureIata.max_distance = await ScheduleFlight.findOne( {
        where: {
          departure_iata: departureIata.departure_iata,
        },
        order: [
          ['distance','DESC']
        ],
      })
    }

    return departureIatas
  } catch (error) {
    throw error
  }
}

module.exports = {
  getHigherPrices,
  getStateWithMoreAirports,
  getScheduleDetailFlight
}
