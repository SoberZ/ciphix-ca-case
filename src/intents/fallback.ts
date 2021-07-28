// Intent name: Default Fallback Intent
export const fallback = (conv: any) => {

    return conv.add(
        `Sorry, I did not understand you.`
    )
}