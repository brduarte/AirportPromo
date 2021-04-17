require('dotenv').config()
const axios = require('axios')


function start() {

}

async function getCombinationAirPort() {

    await fetchMockupAirPort('/airports')

}

function fetchMockupAirPort(uri) {
    try {
        let api = axios.create({
            baseURL: `${prosses.env.API_MOCKUP_BASE_URL}/${uri}/${prosses.env.API_MOCKUP_BASE_URL}`,
            timeout: 1000,
        })

        api.interceptors.request.use(config => {
            config.headers = {
                ...config.headers,
                auth:{
                    username: prosses.env.API_MOCKUP_AIRPORT_USERNAME,
                    password: prosses.env.API_MOCKUP_AIRPORT_PASSWORD
                }
            };
            return config;
        });

    } catch (error) {
        console.error(error)
    }
}