// Intent name: Weather at Time and Location

import axios from 'axios'
import { apiKey } from '../apiKey'


export const weatherAtTimeAndLocation = async (conv: any) => {

    // Get the parameters.
    const city = conv.parameters.city
    const askTime = new Date(conv.parameters.time)

    try {
        // Get lat and lon for a city.
        const loc = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const coords = loc.data.coord

        // Retrieve the weather data at a location.
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={alerts}&appid=${apiKey}&units=metric`)

        // We need the hourly data so we can loop through the data and check
        // which fits our time best.
        let weatherData: Array<any> = weather.data.hourly

        // Convert unix time to UTC date.
        weatherData.map(element => {
            let convertedTime = new Date(element.dt * 1000)
            element.dt = convertedTime.toUTCString()

            // Calculate the difference in hours between the element
            // time and the asked time.
            element.delta_time = Math.abs(convertedTime.getUTCHours() - askTime.getUTCHours())
        })

        // Difference between current time and asked time.
        let diffTime = Math.abs(new Date().getUTCHours() - askTime.getUTCHours())

        // Return the first next time that is available.
        for(let el of weatherData) {
            if (el.delta_time == diffTime) {
                return conv.add(
                    `${askTime} it will be ${el.temp} with ${el.weather[0].description}`
                    )
            }
        }

    } catch (err) {
        conv.add("Weather data for time and location is currently unavailable. Please try again later.")
    }
}
