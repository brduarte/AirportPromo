import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

start()

async function start() {

    await getCombinationAirPort()

}

async function getCombinationAirPort() {
    try {
        const response = await fetchMockupAirPort('airports').get()
    } catch (error) {
        console.log(error.response.data)
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