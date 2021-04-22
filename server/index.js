import dotenv from 'dotenv'
import moment from "moment"
import {
  fetchMockupAirPortAPI,
  getScheduledFlightsByDate,
  getDistanceFromLatLonInKm,
  calculateFlightDurationInHours,
  calculateAverageSpeed,
  calculatepricePerFare
} from './utilities/index.js'

dotenv.config()

flightProcessor()

async function flightProcessor() {
  try {
    const {data} = await fetchMockupAirPortAPI('airports').get()
    const airports = Object.values(data).slice(0, 3)

    for (const airportA of airports) {
      for (const airportB of airports) {

        var {data: scheduledFlights} = await getScheduledFlightsByDate(airportA, airportB, moment().add(40, 'days').format('YYYY-MM-DD'))
        scheduledFlights.summary.distance = {
          value: getDistanceFromLatLonInKm(airportA, airportB),
          type: 'Km'
        }

        if (airportA.iata === airportB.iata) continue;

        scheduledFlights.options.forEach(option => {
          let flightHours = calculateFlightDurationInHours(option.departure_time, option.arrival_time)

          option.average_speed = {
            value: calculateAverageSpeed(flightHours, scheduledFlights.summary.distance.value),
            type: 'KM/h'
          }
          option.fare_per_KM = {
            value: calculatepricePerFare(option.fare_price, scheduledFlights.summary.distance.value),
            type: 'R$'
          }
        });
      }
    }
  } catch (error) {
    throw error
  }
}

