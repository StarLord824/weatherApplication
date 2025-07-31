import { useState, useEffect } from "react";
import Graph from "./HourlyData";
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
import getLocationFromIP from "../../api/getLocation";
import WeatherData, {
  DailyData,
  HourlyData,
} from "../../interfaces/weatherData";

const HomeScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null); // Default city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string>(
    "/weatherLogos/cloudy.svg"
  );

  const fetchWeatherData = async (city: string | null) => {
    try {
      setLoading(true);
      setError(null);
      let coords: { city: string; lat: number; lon: number };
      if (city === null) {
        coords = await getLocationFromIP();
        city = coords.city;
      } else {
        coords = await getCityCoordinates(city);
      }
      // console.log(coords)
      const data: WeatherData = await getWeatherData(coords.lat, coords.lon);
      const logo = getWeatherLogo(data.weatherCode);
      setSelectedCity(coords.city);
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
    <div className=" flex flex-col  min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Sidebar onCitySelect={handleCitySelect} />
      <SettingsIcon />
      <div className="flex justify-center items-center p-6 h-screen w-full">
        <div className=" bg-black/60 rounded-xl backdrop-blur-lg shadow-lg p-6 h-full w-3/4">
          {loading ? (
            <div className="text-white text-center py-20">
              {" "}
              <LoadingAnimation />{" "}
            </div>
          ) : (
            <>
              {/* City Name */}
              <div className="text-3xl font-bold text-white mb-4 text-center">
                {selectedCity
                  ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
                  : ""}
              </div>

              {/* Temperature and Weather */}
              <div className="flex justify-around items-start text-center mb-2">
                <div className="text-6xl font-bold text-white mb-2">
                  {Math.round(weatherData?.currentTemp ?? 0)}°
                </div>
                {/* Weather Icon/Logo */}
                <div className="flex justify-center">
                  <img
                    src={currentLogo}
                    alt="Weather Icon"
                    className="w-30 h-30"
                  />
                </div>
                <div className="flex flex-col justify-around text-white/90">
                  <div className="text-xl font-bold">
                    {getWeatherDescription(weatherData?.weatherCode ?? 0)}
                  </div>
                  <div>
                    {
                      <FaLongArrowAltUp className="text-red-400 relative bottom-0.5 inline-block" />
                    }{" "}
                    21°{" "}
                    <FaLongArrowAltDown className="text-blue-400 relative bottom-0.5 inline-block" />{" "}
                    37°
                  </div>
                </div>
              </div>

              {/* hourly and daily forecast */}
              <div className="h-40 w-full flex  justify-center items-center">
                {weatherData?.hourlyData && (
                  <HourlyForecast hourlyData={weatherData.hourlyData} />
                )}
                {weatherData?.dailyData && (
                  <DailyForecast dailyData={weatherData.dailyData} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export function HourlyForecast({ hourlyData }: { hourlyData: HourlyData }) {
  return (
    <div className="bg-white/10 rounded-lg p-4">
      <div className="text-xl font-bold text-white mb-2">Hourly Forecast</div>
      <Graph hourlyData={hourlyData} />
    </div>
  );
}

export function DailyForecast({ dailyData }: { dailyData: DailyData }) {
  if (!dailyData) return null;
  return (
    <div className="bg-white/10 rounded-lg p-4 mt-4">
      <div className="text-xl font-bold text-white mb-4 text-center">
        Daily Forecast
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {dailyData.date.map((date, index) => (
          <div
            key={date}
            className="flex flex-col items-center bg-black/30 rounded-lg p-3 shadow"
          >
            <div className="text-white text-lg font-semibold mb-1">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-blue-200 text-sm">
                {Math.round(dailyData.minTemp[index])}°
              </span>
              <span className="text-white/60 text-xs">/</span>
              <span className="text-red-200 text-sm">
                {Math.round(dailyData.maxTemp[index])}°
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded"
                style={{
                  width: `${
                    ((dailyData.maxTemp[index] - dailyData.minTemp[index]) /
                      40) *
                    100
                  }%`,
                  minWidth: "10%",
                }}
              />
            </div>
            <div className="text-blue-300 text-xs">
              Precip: {Math.round(dailyData.precipitationProb[index])}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
