import axios from 'axios';

interface WeatherData {
  temp: number;
  location: string;
  humidity: number;
  windSpeed: number;
  weatherType: string;
}

const getForecast = async (location: string): Promise<WeatherData | string> => {
  const url = "https://api.openweathermap.org/data/2.5/weather"

  try {
    const response = await axios.get(url, {
        params: {
            q: location,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
            units: 'metric'
        }
    });

    const data = response.data;
    const weatherData: WeatherData = {
        temp: data.main.temp,
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherType: data.weather[0].main
    };

    return weatherData;
  } catch (err) {
      console.error('Error fetching weather data:', err);
      return 'Could not fetch weather data. Please check the location name.';
  }
};

export default getForecast;
export type { WeatherData };