import React from "react";
import {
  FiSun,
  FiSunset,
  FiWind,
  FiDroplet,
  FiThermometer,
  FiActivity,
} from "react-icons/fi";
import Loading from "../common/Loading";

interface StatsProps {
  dailyData?: {
    date: string[];
    maxTemp: number[];
    minTemp: number[];
    precipitationProb: number[];
    sunrise: string[];
    sunset: string[];
    uvIndex: number[];
  };
  current?: {
    windSpeed: number;
    humidity: number;
    feelsLike: number;
    pressure: number;
  };
  isLoading?: boolean;
}

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="bg-white/10 rounded-lg p-4 flex items-center space-x-3">
    <div className="text-white/80 text-xl">{icon}</div>
    <div>
      <div className="text-white/60 text-sm">{title}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  </div>
);

const Stats = ({ dailyData, current, isLoading }: StatsProps) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!dailyData || !current) return null;

  return (
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<FiThermometer />}
          title="Feels Like"
          value={`${Math.round(current.feelsLike)}°`}
        />
        <StatCard
          icon={<FiDroplet />}
          title="Humidity"
          value={`${current.humidity}%`}
        />
        <StatCard
          icon={<FiWind />}
          title="Wind Speed"
          value={`${Math.round(current.windSpeed)} km/h`}
        />
        <StatCard
          icon={<FiActivity />}
          title="Pressure"
          value={`${Math.round(current.pressure)} hPa`}
        />
        <StatCard
          icon={<FiSun />}
          title="Sunrise"
          value={new Date(dailyData.sunrise[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
        <StatCard
          icon={<FiSunset />}
          title="Sunset"
          value={new Date(dailyData.sunset[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </div>

      {/* Daily Forecast */}
      <h3 className="text-white text-lg font-semibold mt-6 mb-4">
        7-Day Forecast
      </h3>
      <div className="space-y-2">
        {dailyData.date.map((date, index) => (
          <div
            key={date}
            className="flex items-center justify-between text-white p-2 rounded-lg hover:bg-white/10"
          >
            <div className="w-24">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/60">
                {Math.round(dailyData.precipitationProb[index])}%
              </span>
              <span>{Math.round(dailyData.minTemp[index])}°</span>
              <div className="w-20 h-1 bg-white/20 rounded">
                <div
                  className="h-full bg-white rounded"
                  style={{
                    width: `${
                      ((dailyData.maxTemp[index] - dailyData.minTemp[index]) /
                        40) *
                      100
                    }%`,
                  }}
                />
              </div>
              <span>{Math.round(dailyData.maxTemp[index])}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
