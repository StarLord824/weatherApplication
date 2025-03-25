interface WeatherResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    pressure_msl: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
}

interface WeatherData {
  currentTemp: number;
  weatherCode: number;
  hourlyData: {
    time: string[];
    temp: number[];
    precipitation: number[];
    weatherCode: number[];
  };
  dailyData: {
    date: string[];
    maxTemp: number[];
    minTemp: number[];
    precipitationProb: number[];
  };
}

const weatherCodeMap: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  95: "Thunderstorm",
};

export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}&` +
        `longitude=${longitude}&` +
        `current=temperature_2m,weather_code&` +
        `hourly=temperature_2m,precipitation_probability,weather_code&` +
        `daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&` +
        `timezone=auto`
    );

    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }

    const data: WeatherResponse = await response.json();

    return {
      currentTemp: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      hourlyData: {
        time: data.hourly.time,
        temp: data.hourly.temperature_2m,
        precipitation: data.hourly.precipitation_probability,
        weatherCode: data.hourly.weather_code,
      },
      dailyData: {
        date: data.daily.time,
        maxTemp: data.daily.temperature_2m_max,
        minTemp: data.daily.temperature_2m_min,
        precipitationProb: data.daily.precipitation_probability_max,
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export function getWeatherDescription(code: number): string {
  return weatherCodeMap[code] || "Unknown";
}

// Simplified geocoding using Open-Meteo Geocoding API
export async function getCityCoordinates(
  city: string
): Promise<{ lat: number; lon: number }> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    if (!data.results?.[0]) {
      throw new Error("City not found");
    }

    return {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  } catch (error) {
    console.error("Error getting city coordinates:", error);
    throw error;
  }
}
