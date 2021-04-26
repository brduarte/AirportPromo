const axios = require('axios')

async function getScheduledFlightsByDate(airportA, airportB, data) {
  try {
    return await fetchMockupAirPortAPI('search').get(`${airportA.iata}/${airportB.iata}/${data}`)
  } catch (error) {
    throw error;
  }
}

async function getAirPort() {
  try {
    return await fetchMockupAirPortAPI('airports').get()
  } catch (error) {
    throw error;
  }
}

function fetchMockupAirPortAPI(uri) {
  try {
    let api = axios.create({
      baseURL: `${process.env.API_MOCKUP_BASE_URL}/${uri}/${process.env.API_MOCKUP_AIRPORT_KEY}`,
    })

    api.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
      };

      config.auth = {
        username: process.env.API_MOCKUP_AIRPORT_USERNAME,
        password: process.env.API_MOCKUP_AIRPORT_PASSWORD
      }

      return config;
    });

    return api

  } catch (error) {
    throw error
  }
}

module.exports = {
  getAirPort,
  getScheduledFlightsByDate
}
