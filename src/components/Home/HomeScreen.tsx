import { useState, useEffect } from "react";
import Graph from "./HourlyData";
// import Stats from "./Stats";
import Sidebar from "../Sidebar/Sidebar";
import LoadingAnimation from "../common/Loading";
import SettingsIcon from "../Settings/SettingsIcon";
// import { WiCloud } from "react-icons/wi"; // Cloudy icon

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
      console.log(data);
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
              <div className="text-3xl font-bold text-white px-18 mt-5 mb-10 ">
                {selectedCity
                  ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
                  : ""}
              </div>

              {/* Temperature and Weather */}
              <div className="flex justify-around items-start text-center mb-2 w-7/10">
                <div className="flex flex-col">
                  <div className="flex items-end text-6xl font-bold text-white mb-2">
                    <div>{Math.round(weatherData?.currentTemp ?? 0)}°</div>
                    <div className="text-xl pb-1 pl-4 font-semibold">
                      <FaLongArrowAltUp className="text-red-400 relative bottom-0.5 inline-block" />{" "}
                      {weatherData?.dailyData?.maxTemp[0]}°{" "}
                      <FaLongArrowAltDown className="text-blue-400 relative bottom-0.5 inline-block" />{" "}
                      {weatherData?.dailyData?.minTemp[0]}°
                    </div>
                  </div>
                  <div className="text-xl font-medium text-white/90 my-4 flex pl-4">
                    {getWeatherDescription(weatherData?.weatherCode ?? 0)}
                  </div>
                </div>

                {/* Weather Icon/Logo */}
                <div className="flex justify-center">
                  <img
                    src={currentLogo}
                    alt="Weather Icon"
                    className="w-30 h-30"
                  />
                </div>
              </div>

              {/* hourly and daily forecast */}
              <div className="flex justify-around items-center gap-4 h-80 w-full">
                {weatherData?.hourlyData && (
                  <HourlyForecast hourlyData={weatherData.hourlyData} />
                )}
                {weatherData?.dailyData && (
                  <DailyForecast dailyData={weatherData.dailyData} />
                )}
              </div>
              <Stats />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export function Stats() {
  return <></>;
}

export function HourlyForecast({ hourlyData }: { hourlyData: HourlyData }) {
  return (
    <div className="bg-white/10 p-4 rounded-xl h-75 w-1/2">
      <div className="text-xl font-bold text-white mb-2">Hourly Forecast</div>
      <Graph hourlyData={hourlyData} />
    </div>
  );
}

export function DailyForecast({ dailyData }: { dailyData: DailyData }) {
  const [showAll, setShowAll] = useState(false);
  if (!dailyData) return null;

  // const todayStr = new Date().toISOString().slice(0, 10);
  const daysToShow = showAll ? dailyData.date.length : 3;

  return (
    <div className="bg-white/10 rounded-xl p-4 h-75 w-1/2 flex flex-col overflow-y-scroll">
      <div className="text-xl font-bold text-white mb-4 ">
        Daily Forecast
      </div>
      <div className="flex flex-col gap-1.5">
        {dailyData.date.slice(0, daysToShow).map((date, index) => {
          // const isToday = date === todayStr;
          return (
            <div
              key={date}
              className="flex items-center bg-black/30 rounded-lg px-4 py-2 shadow w-full"
            >
              
              
              {/* Weekday or Today */}
              <div className="w-20 text-white text-base font-semibold">
                {index==0
                  ? "Today"
                  : new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
              </div>
              
              {/* Cloudy Icon */}
              <div className="text-2xl text-blue-200 mx-2" >
                  <img src={'/weatherLogos/cloudy.svg'} alt="Cloudy Icon" className="w-10 h-10" />
              </div>

              {/* Precipitation */}
              <div className="w-16 text-blue-300 text-xs font-medium">
                {Math.round(dailyData.precipitationProb[index])}%
              </div>
              {/* Temp Range Bar */}
              <div className="flex-1 flex items-center mx-2">
                <span className="text-blue-200 text-sm mr-1">
                  {Math.round(dailyData.minTemp[index])}°
                </span>
                <div className="relative w-full h-2 bg-white/20 rounded mx-1">
                  <div
                    className="absolute h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded"
                    style={{
                      left: 0,
                      width: `${
                        ((dailyData.maxTemp[index] - dailyData.minTemp[index]) /
                          40) *
                        100
                      }%`,
                      minWidth: "10%",
                    }}
                  />
                </div>
                <span className="text-red-200 text-sm ml-1">
                  {Math.round(dailyData.maxTemp[index])}°
                </span>
              </div>
                
            </div>
          );
        })}
      </div>
      {dailyData.date.length > 2 && (
        <button
          className="mt-4 mx-auto py-1 w-4/5 bg-black/20 text-white rounded hover:bg-black/50 transition"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
  </div>
  );
}
export default HomeScreen;
