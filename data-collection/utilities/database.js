const {Client} = require('pg')

async function saveScheduleFlight(scheduleFlight) {
  try {
    let client = await createConnection()
    let data = await client.query(`INSERT INTO schedule_flight(departure_iata, arrival_iata, endpoint_url, distance,
                                                               min_value, aircraft_model)
                                   VALUES ($1, $2, $3, $4, $5, $6)`, [
      scheduleFlight.summary.from.iata,
      scheduleFlight.summary.to.iata,
      scheduleFlight.endpoint_url,
      scheduleFlight.summary.distance.value,
      scheduleFlight.lowerOption.fare_price,
      scheduleFlight.lowerOption.aircraft.model
    ])
    client.end()
    return data
  } catch (error) {
    throw error.message
  }
}

async function getFlightScheduleByEndpoint(endPoint) {
  try {
    let client = await createConnection()
    let data = await client.query({
      text: `SELECT endpoint_url
             FROM schedule_flight
             WHERE endpoint_url = $1`,
      values: [endPoint],
    })
    client.end()
    return data;
  } catch (error) {
    throw error.message
  }
}

async function createConnection() {
  let connection = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  await connection.connect()
  return connection
}

module.exports = {
  saveScheduleFlight,
  getFlightScheduleByEndpoint
}
