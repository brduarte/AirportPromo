import axios from "axios";
import moment from "moment";

async function getScheduledFlightsByDate(airportA, airportB, data) {
    try {
        return await fetchMockupAirPortAPI('search').get(`${airportA.iata}/${airportB.iata}/${data}`)
    } catch (error) {
        throw error;
    }
}

function getDistanceFromLatLonInKm(pointA = {lat: '', lon: ''}, pointB = {lat: '', lon: ''}) {
    const raio = 6371; // Raio da Terra em KM
    let dLat = deg2rad(pointB.lat - pointA.lat);
    let dLon = deg2rad(pointB.lat - pointA.lat);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pointA.lat)) * Math.cos(deg2rad(pointB.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distancia = raio * c; // Distance em KM

    // Converte o número em graus ao equivalente em radianos
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    return Math.round(distancia);
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
        console.error(error)
    }
}

function calculateAverageSpeed(hours, distance) {
    return Math.round(distance / hours)
}

function calculatepricePerFare(price, distance) {
    return (price / distance).toFixed(2)
}

function calculateFlightDurationInHours(start, end) {
    let departureTime = moment(start);
    let arrivalTime = moment(end)
    const duration = moment.duration(arrivalTime.diff(departureTime));
    return duration.asHours()
}

export  {
    fetchMockupAirPortAPI,
    calculateAverageSpeed,
    calculatepricePerFare,
    getDistanceFromLatLonInKm,
    getScheduledFlightsByDate,
    calculateFlightDurationInHours
}