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

module.exports = {
  getHigherPrices
}
