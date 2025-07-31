import { useState, useEffect } from "react";
import Graph from "./Graph";
import Stats from "./Stats";
import Sidebar from "../Sidebar/Sidebar";
import LoadingAnimation from "../common/Loading";
import SettingsIcon from "../Settings/SettingsIcon";

import { getCityCoordinates } from "../../api/getCoordinates";
import {
  getWeatherData,
  getWeatherDescription,
  getWeatherLogo,
} from "../../api/weatherApi";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

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
// interface WeatherData {
//   currentTemp: number;
//   weatherCode: number;
//   hourlyData: {
//     time: string[];
//     temp: number[];
//     precipitation: number[];
//     weatherCode: number[];
//   };
//   dailyData: {
//     date: string[];
//     maxTemp: number[];
//     minTemp: number[];
//     precipitationProb: number[];
//     uv_index_max: number[];
//   };
//   current: {
//     relative_humidity_2m: number;
//     wind_speed_10m: number;
//     pressure_msl: number;
//     apparent_temperature: number;
//   };
// }

const HomeScreen = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi"); // Default city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const coords = await getCityCoordinates(city);
      const data: WeatherData = await getWeatherData(coords.lat, coords.lon);
      const logo=getWeatherLogo(data.weatherCode);
      setCurrentLogo(logo);
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
        <SettingsIcon />
        <div className="pl-16 p-6 flex items-center justify-center">
          <div className="text-white text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Sidebar onCitySelect={handleCitySelect} />
      <SettingsIcon />
      <div className="pl-16">
        <div className="p-6">
          <div className="max-w-md mx-auto bg-black/60 rounded-xl backdrop-blur-lg shadow-lg p-6">
            {loading ? (
              <div className="text-white text-center py-20">
                {" "}
                <LoadingAnimation />{" "}
              </div>
            ) : (
              <>
                {/* City Name */}
                <div className="text-3xl font-bold text-white mb-4 text-center">
                  {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                </div>

                {/* Temperature and Weather */}
                <div className="flex justify-around text-center mb-6">
                  <div className="text-6xl font-bold text-white mb-2">
                    {Math.round(weatherData?.currentTemp ?? 0)}°
                  </div>
                  <div className="flex flex-col justify-around text-white/90">
                    <div className="text-xl font-bold">
                      {getWeatherDescription(weatherData?.weatherCode ?? 0)}
                    </div>
                    <div>
                      {<FaLongArrowAltUp className="text-red-400 relative bottom-0.5 inline-block" />} 21°   <FaLongArrowAltDown className="text-blue-400 relative bottom-0.5 inline-block"/> 37°
                    </div>
                  </div>
                </div>

                {/* Weather Icon/Logo */}
                <div className="flex justify-center my-6">
                  <img
                    src={currentLogo}
                    alt="Weather Icon"
                    className="w-36 h-36"
                  />
                </div>

                {/* Graph and Stats Section */}
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <Graph hourlyData={weatherData?.hourlyData} />
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <Stats
                      dailyData={weatherData?.dailyData}
                      current={weatherData?.current}
                    />
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
