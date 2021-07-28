// Intent: Weather at Arrival - Departure - Arrival - Follow up

import axios from "axios"
import { apiKey } from "../apiKey"


export const weatherAtArrivalFollowUp = async (conv: any) => {

    // Obtain session variables.
    let sessionVars = conv.contexts[2].parameters
    let departure = sessionVars.departure
    let arrival = sessionVars.arrival
    let duration = sessionVars.duration.amount

    // Calculate the weather of arrival.
    try {
        // Get weather from departure.
        const depWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${departure}&appid=${apiKey}&units=metric`)
        const descr = depWeather.data.weather[0].description
        const temp = depWeather.data.main.temp

        conv.add(`The weather at your departure ${departure} is ${descr} with a temperature of ${temp} celsius.`)

        // Get lat and lon for a city.
        const loc = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${arrival}&appid=${apiKey}&units=metric`)
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

            // Calculate the difference in hours between the element time
            // and the current time.
            element.delta_time = Math.abs(new Date().getUTCHours() - convertedTime.getUTCHours())
        })

        // Return the first next time that is available.
        for(let el of weatherData) {
            if (el.delta_time == duration) {
                return conv.add(
                    `We expect that at your arrival in ${arrival} it will be ${el.temp} with ${el.weather[0].description}`
                    )
            }
        }

    } catch (err) {
        conv.add("Weather data for time and location is currently unavailable. Please try again later.")
    }
}