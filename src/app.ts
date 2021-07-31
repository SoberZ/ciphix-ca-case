import express from 'express'
import cors from 'cors'

import { WebhookClient } from 'dialogflow-fulfillment'

// intent method imports
import { fallback } from './intents/fallback'
import { welcome } from './intents/welcome'
import { weatherAtLocation } from './intents/weatherAtLocation'
import { weatherAtTimeAndLocation } from './intents/weatherAtTimeAndLocation'
import { weatherFromFlight } from './intents/weatherFromFlight'
import { weatherAtDeparture } from './intents/weatherAtDeparture'
import { weatherAtArrival } from './intents/weatherAtArrival'
import { weatherAtArrivalFollowUp } from './intents/weatherAtArrivalFollowUp'
import { welcomeSimple } from './intents/welcomeSimple'

const app = express()

const PORT: number = 8080

app.use(
    cors({ origin: '*' }),
    express.json(),
)

// Map of intent-name to their respective method
const intents = new Map<string, (agent: any) => void>()

// Set specific intent-name to it's respective method
intents.set('Default Fallback Intent', fallback)
intents.set('Default Welcome Intent', welcome)
intents.set('Weather at Location', weatherAtLocation)
intents.set('Weather at Time and Location', weatherAtTimeAndLocation)
intents.set("Weather from Flight", weatherFromFlight)
intents.set("Weather from Flight - Departure", weatherAtDeparture)
intents.set("Weather from Flight - Departure - Arrival", weatherAtArrival)
intents.set("Weather from Flight - Departure - Arrival - Follow up", weatherAtArrivalFollowUp)
intents.set("Default Welcome Intent - Simple", welcomeSimple)

app.post('/', async (req, res) => {
    const agent: any = new WebhookClient({ request: req, response: res })

    await agent.handleRequest(intents)
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`))