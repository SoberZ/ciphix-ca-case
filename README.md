# Ciphix' Conversational Automation Air Case


## Documentation

The Ciphix Air Virtual Assistant is able to handle different inputs the users give the bot. The Virtual Assistant is also supported in Telegram via this link: https://t.me/CiphixAirBot

## Features

- Obtain the weather conditions for a specific city
- Obtain the weather conditions for a city with a specified time
- Obtain flight's departure and destination weather


## Encountered problems

Problems that were encoutered were:
- Retrieving the weather for a specific time. If a user wants to retrieve the weather for a time in future after the current or following day, the virtual assistant will not be able get gather that data. But for this case, it would seem unnecessary since flights are never over a day long.
- Retrieving weather from the departure as well as the destination. This was solved by asking the destination and departure location to know from where we should gather the weather data from.


## Diagram


