// Intent name: Weather at Location

import axios from 'axios'
import { apiKey } from '../apiKey'


export const weatherAtLocation = async (conv: any) => {

    // Get the city parameter.
    const city = conv.parameters.city

    // Obtain the weather from the location using the goweather API.
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            const descr = res.data.weather[0].description
            const temp = res.data.main.temp

            conv.add(`The weather in ${city} is ${descr} with a temperature of ${temp} celsius.`)
        }).catch(_ => {
            conv.add("Weather data is currently unavailable. Please try again later.")
        })
}
