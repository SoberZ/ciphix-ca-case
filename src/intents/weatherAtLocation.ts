// Intent name: Weather at Location

import axios from 'axios'


export const weatherAtLocation = async (conv: any) => {

    // Get the city parameter
    const city = conv.parameters.city

    // Obtain the weather from the location
    return axios.get(`https://goweather.herokuapp.com/weather/${city}`).then(res => {
            const temp = res.data.temperature
            const descr = res.data.description
            const wind = res.data.wind

            conv.add(`In ${city} it's currently ${temp} and ${descr}. The windspeed is ${wind}.`)
        }).catch(res => {
            conv.add("Weather data is currently unavailable. Please try again later.")
        })
}
