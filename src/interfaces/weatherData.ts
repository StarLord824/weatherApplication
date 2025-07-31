export default interface WeatherData {
  currentTemp: number;
  weatherCode: number;

  current: CurrentData;
  hourlyData: HourlyData;
  dailyData: DailyData;
}

export interface CurrentData {
  relative_humidity_2m: number;
  wind_speed_10m: number;
  pressure_msl: number;
  apparent_temperature: number;
};

export interface HourlyData {
  time: string[];
  temp: number[];
  precipitation: number[];
  precipitationProb: number[];
  weatherCode: number[];
  visibility: number[];
};

export interface DailyData {
    date: string[];
    maxTemp: number[];
    minTemp: number[];
    precipitationSum: number[];         // optional: total ppt instead of just probability
    precipitationProb: number[];
    sunrise: string[];
    sunset: string[];
    uvIndex: number[];
};
// export interface WeatherData {
//   latitude: number;
//   longitude: number;
//   elevation: number;
//   generationtime_ms: number;
//   utc_offset_seconds: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   current_units: CurrentUnits;
//   current: CurrentData;
//   hourly_units: HourlyUnits;
//   hourly: HourlyData;
//   daily_units: DailyUnits;
//   daily: DailyData;
// }

// // ---------------------- HOURLY ----------------------
// export interface HourlyUnits {
//   time: string;
//   temperature_2m: string;
//   precipitation: string;
//   precipitation_probability: string;
//   weather_code: string;
//   visibility: string;
// }

// export interface HourlyData {
//   time: string[];
//   temperature_2m: number[];
//   precipitation: number[];
//   precipitation_probability: number[];
//   weather_code: number[];
//   visibility: number[];
// }

// // ---------------------- DAILY ----------------------
// export interface DailyUnits {
//   time: string;
//   temperature_2m_max: string;
//   temperature_2m_min: string;
//   precipitation_sum: string;
//   precipitation_probability_max: string;
//   sunrise: string;
//   sunset: string;
//   uv_index_max: string;
// }

// export interface DailyData {
//   time: string[];
//   temperature_2m_max: number[];
//   temperature_2m_min: number[];
//   precipitation_sum: number[];
//   precipitation_probability_max: number[];
//   sunrise: string[];
//   sunset: string[];
//   uv_index_max: number[];
// }

// // ---------------------- CURRENT ----------------------
// export interface CurrentUnits {
//   temperature_2m: string;
//   weather_code: string;
//   wind_speed_10m: string;
//   relative_humidity_2m: string;
//   apparent_temperature: string;
//   pressure_msl: string;
// }

// export interface CurrentData {
//   time: string;
//   temperature_2m: number;
//   weather_code: number;
//   wind_speed_10m: number;
//   relative_humidity_2m: number;
//   apparent_temperature: number;
//   pressure_msl: number;
// }

