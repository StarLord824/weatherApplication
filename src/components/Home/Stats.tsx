// import {
//   FiSun,
//   FiSunset,
//   FiWind,
//   FiDroplet,
//   FiThermometer,
//   FiActivity,
// } from "react-icons/fi";
import Loading from "../common/Loading";

interface WeatherStats {
  current: undefined | {
    relative_humidity_2m: number;
    wind_speed_10m: number;
    pressure_msl: number;
    apparent_temperature: number;
  };
  isLoading: boolean;
}

export default function Stats({ current, isLoading }: WeatherStats) {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div>

    </div>
  );
}

// const StatCard = ({
//   icon,
//   title,
//   value,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   value: string;
// }) => (
//   <div className="bg-white/10 rounded-lg p-4 flex items-center space-x-3">
//     <div className="text-white/80 text-xl">{icon}</div>
//     <div>
//       <div className="text-white/60 text-sm">{title}</div>
//       <div className="text-white font-semibold">{value}</div>
//     </div>
//   </div>
// );

// const DayForecast = ({
//   day,
//   min,
//   max,
//   precipitation,
// }: {
//   day: string;
//   min: number;
//   max: number;
//   precipitation: number;
// }) => (
//   <div className="flex items-center justify-between text-white p-2 rounded-lg hover:bg-white/10">
//     <div className="w-24">
//       {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
//     </div>
//     <div className="flex items-center space-x-4">
//       <span className="text-white/60">{Math.round(precipitation)}%</span>
//       <span>{Math.round(min)}°</span>
//       <div className="w-20 h-1 bg-white/20 rounded">
//         <div
//           className="h-full bg-white rounded"
//           style={{
//             width: `${((max - min) / 40) * 100}%`,
//           }}
//         />
//       </div>
//       <span>{Math.round(max)}°</span>
//     </div>
//   </div>
// );

// const Stats = ({ dailyData, current, isLoading }: WeatherStats) => {
//   if (isLoading) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   if (!dailyData || !current) {
//     return null;
//   }

//   return (
//     <div>
//       {/* Current Weather Details */}
//       <h3 className="text-white text-lg font-semibold mb-4">Weather Details</h3>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <StatCard
//           icon={<FiThermometer />}
//           title="Feels Like"
//           value={`${Math.round(current.feelsLike)}°`}
//         />
//         <StatCard
//           icon={<FiDroplet />}
//           title="Humidity"
//           value={`${current.humidity}%`}
//         />
//         <StatCard
//           icon={<FiWind />}
//           title="Wind Speed"
//           value={`${Math.round(current.windSpeed)} km/h`}
//         />
//         <StatCard
//           icon={<FiActivity />}
//           title="Pressure"
//           value={`${Math.round(current.pressure)} hPa`}
//         />
//         <StatCard
//           icon={<FiSun />}
//           title="Sunrise"
//           value={new Date(dailyData.sunrise[0]).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         />
//         <StatCard
//           icon={<FiSunset />}
//           title="Sunset"
//           value={new Date(dailyData.sunset[0]).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         />
//       </div>

//       {/* 7-Day Forecast */}
//       <h3 className="text-white text-lg font-semibold mb-4">7-Day Forecast</h3>
//       <div className="space-y-2">
//         {dailyData.date.map((date, index) => (
//           <DayForecast
//             key={date}
//             day={date}
//             min={dailyData.minTemp[index]}
//             max={dailyData.maxTemp[index]}
//             precipitation={dailyData.precipitationProb[index]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Stats;
