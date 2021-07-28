// Intent name: Weather from Flight

export const weatherFromFlight = async (conv: any) => {
    return conv.add("What the city of your flight's departure?")
}
