export const useWeather = async (city: string) => {
    const config = useRuntimeConfig()

    const apiKey = config.public.openweatherApiKey
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const { data, error } = await useFetch(url)

    if (error.value) {
        console.error(error.value.message)
    }

    return data
}
