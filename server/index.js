import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

start()

async function start() {
    await getCombinationAirPort()
}

async function getCombinationAirPort() {
    try {
        const { data } = await fetchMockupAirPort('airports').get()

        const airports = convertObjectToArray(data)
        const combinationsAirPorts = permutations(airports.slice(0, 10))

        return combinationsAirPorts;

    } catch (error) {
        console.log(error)
    }
}

function fetchMockupAirPort(uri) {
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

function permutations(airports) {
    let result = [];

    if (airports.length === 0) {
        result.push([]);
    } else {

        for (var i = 0; i < airports.length; i++) {
            let firstChar = airports[i];
            let otherChars = airports.slice(0, i).concat(airports.slice(i + 1));
            let otherPermutations = permutations(otherChars);

            for (var j = 0; j < otherPermutations.length; j++) {
                result.push([firstChar].concat(otherPermutations[j]));
            }
        }
    }
    return result;

}


// O sacrificio da performance :(
function convertObjectToArray(airports) {
    let result = []

    for (const key in airports) {
        result.push(airports[key])
    }

    return result;
}