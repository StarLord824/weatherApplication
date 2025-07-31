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
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
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
        `current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,pressure_msl&` +
        `hourly=temperature_2m,precipitation_probability,weather_code&` +
        `daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&` +
        `timezone=auto`
    );

    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }
    const data: WeatherResponse = await response.json();
    // console.log('after', data)
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

const weatherLogoMap: { [key: number]: string } = {
  0: "/weatherLogos/clear.svg",
  1: "/weatherLogos/mostly_clear.svg",
  2: "/weatherLogos/partly_cloudy.svg",
  3: "/weatherLogos/cloudy.svg",
  45: "/weatherLogos/fog.svg",
  48: "/weatherLogos/fog.svg",
  51: "/weatherLogos/drizzle.svg",
  53: "/weatherLogos/drizzle.svg",
  55: "/weatherLogos/drizzle.svg",
  56: "/weatherLogos/freezing_drizzle.svg",
  57: "/weatherLogos/freezing_drizzle.svg",
  61: "/weatherLogos/rain.svg",
  63: "/weatherLogos/rain.svg",
  65: "/weatherLogos/rain.svg",
  66: "/weatherLogos/freezing_rain.svg",
  67: "/weatherLogos/freezing_rain.svg",
  71: "/weatherLogos/snow.svg",
  73: "/weatherLogos/snow.svg",
  75: "/weatherLogos/snow.svg",
  77: "/weatherLogos/snow.svg",
  80: "/weatherLogos/showers.svg",
  81: "/weatherLogos/showers.svg",
  82: "/weatherLogos/showers.svg",
  85: "/weatherLogos/snow_showers.svg",
  86: "/weatherLogos/snow_showers.svg",
  95: "/weatherLogos/thunderstorm.svg",
  96: "/weatherLogos/thunderstorm_hail.svg",
  99: "/weatherLogos/thunderstorm_hail.svg",
};

export function getWeatherLogo(code: number): string {
  return weatherLogoMap[code] || "/weatherLogos/cloudy.svg";
}

