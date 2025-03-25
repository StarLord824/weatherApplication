import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import Stats from "./Stats";
import Sidebar from "../Sidebar/Sidebar";
import {
  getWeatherData,
  getCityCoordinates,
  getWeatherDescription,
} from "../../api/weatherApi";

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
    uv_index_max: number[];
  };
  current: {
    relative_humidity_2m: number;
    wind_speed_10m: number;
    pressure_msl: number;
    apparent_temperature: number;
  };
}

const HomeScreen = () => {
  const [selectedCity, setSelectedCity] = useState("London"); // Default city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const coords = await getCityCoordinates(city);
      const data = await getWeatherData(coords.lat, coords.lon);
      setWeatherData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800">
        <Sidebar onCitySelect={handleCitySelect} />
        <div className="pl-16 p-6 flex items-center justify-center">
          <div className="text-white text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800">
      <Sidebar onCitySelect={handleCitySelect} />

      <div className="pl-16">
        <div className="p-6">
          <div className="max-w-md mx-auto bg-white/20 rounded-xl backdrop-blur-lg shadow-lg p-6">
            {loading ? (
              <div className="text-white text-center py-20">Loading...</div>
            ) : (
              <>
                {/* City Name */}
                <div className="text-3xl font-bold text-white mb-4 text-center">
                  {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                </div>

                {/* Temperature and Weather */}
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-white mb-2">
                    {Math.round(weatherData?.currentTemp ?? 0)}°
                  </div>
                  <div className="text-xl text-white/90">
                    {getWeatherDescription(weatherData?.weatherCode ?? 0)}
                  </div>
                </div>

                {/* Weather Icon/Logo */}
                <div className="flex justify-center mb-6">
                  {/* Add your weather icon here based on weatherCode */}
                </div>

                {/* Graph and Stats Section */}
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    {/* <Graph data={weatherData?.hourlyData} /> */}
                    <h1>hi</h1>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    {/* <Stats
                      data={weatherData?.dailyData}
                      current={{
                        humidity:
                          weatherData?.current.relative_humidity_2m ?? 0,
                        windSpeed: weatherData?.current.wind_speed_10m ?? 0,
                        pressure: weatherData?.current.pressure_msl ?? 0,
                        feelsLike:
                          weatherData?.current.apparent_temperature ?? 0,
                        uvIndex: weatherData?.dailyData.uv_index_max[0] ?? 0,
                      }}
                    /> */}
                    <h1>hi</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
