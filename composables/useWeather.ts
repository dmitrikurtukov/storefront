interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

export const useWeather = (city: string) => {
  const config = useRuntimeConfig();

  const data = ref<WeatherData | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(true);

  const fetchWeather = async () => {
    try {
      const apiKey = config.public.openweatherApiKey;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await useFetch<WeatherData>(url);

      if (!response.data.value) {
        error.value = "Failed to fetch weather data.";
        return;
      }

      data.value = response.data.value;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const promise = fetchWeather();

  return { data, error, loading, promise };
};
