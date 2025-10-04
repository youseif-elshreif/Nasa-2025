"use client";

import { useEffect, useState } from "react";
import { getAllWeatherData, type PowerApiResponse } from "@/lib/nasa-power-api";
import WeatherChart from "@/components/WeatherChart";
import { FaTemperatureHigh, FaTint, FaWind, FaSun, FaSpinner, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";

interface WeatherStats {
  temperature: { avg: number; min: number; max: number };
  humidity: { avg: number; min: number; max: number };
  windSpeed: { avg: number; min: number; max: number };
  solarIrradiance: { avg: number; min: number; max: number };
}

export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<PowerApiResponse | null>(null);
  const [stats, setStats] = useState<WeatherStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllWeatherData();
        setWeatherData(data);

        // Calculate statistics
        const tempValues = Object.values(data.properties.parameter.T2M || {});
        const humidValues = Object.values(data.properties.parameter.RH2M || {});
        const windValues = Object.values(data.properties.parameter.WS10M || {});
        const solarValues = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN || {});

        setStats({
          temperature: {
            avg: tempValues.reduce((a, b) => a + b, 0) / tempValues.length,
            min: Math.min(...tempValues),
            max: Math.max(...tempValues),
          },
          humidity: {
            avg: humidValues.reduce((a, b) => a + b, 0) / humidValues.length,
            min: Math.min(...humidValues),
            max: Math.max(...humidValues),
          },
          windSpeed: {
            avg: windValues.reduce((a, b) => a + b, 0) / windValues.length,
            min: Math.min(...windValues),
            max: Math.max(...windValues),
          },
          solarIrradiance: {
            avg: solarValues.reduce((a, b) => a + b, 0) / solarValues.length,
            min: Math.min(...solarValues),
            max: Math.max(...solarValues),
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = (parameterData: { [timestamp: string]: number }) => {
    const entries = Object.entries(parameterData);
    // Sample data to show monthly averages instead of all hourly data
    const dailyAverages: { [date: string]: number[] } = {};
    
    entries.forEach(([timestamp, value]) => {
      const date = timestamp.substring(0, 8); // YYYYMMDD
      if (!dailyAverages[date]) {
        dailyAverages[date] = [];
      }
      dailyAverages[date].push(value);
    });

    return Object.entries(dailyAverages)
      .map(([date, values]) => ({
        date: `${date.substring(4, 6)}/${date.substring(6, 8)}`,
        value: values.reduce((a, b) => a + b, 0) / values.length,
      }))
      .filter((_, index, array) => index % 3 === 0 || index === array.length - 1); // Show every 3rd day
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading Weather Data from NASA POWER API...</p>
          <p className="text-gray-400 mt-2">Fetching data from October 2024 to October 2025</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData || !stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-blue-500/15 to-indigo-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-600/15 blur-3xl rounded-full bottom-20 right-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-20 py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Egypt Weather Data
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            NASA POWER API - Historical Weather Analysis
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Giza, Egypt (31.2°N, 29.9°E)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <FaCalendar className="text-purple-400" />
              <span>October 1, 2024 - October 1, 2025</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Temperature Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <FaTemperatureHigh className="text-3xl text-red-400" />
              <h3 className="text-xl font-bold">Temperature</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-300">{stats.temperature.avg.toFixed(1)}°C</div>
              <div className="text-sm text-gray-400">
                <span className="text-red-200">Max: {stats.temperature.max.toFixed(1)}°C</span>
                <span className="mx-2">|</span>
                <span className="text-blue-200">Min: {stats.temperature.min.toFixed(1)}°C</span>
              </div>
            </div>
          </div>

          {/* Humidity Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <FaTint className="text-3xl text-blue-400" />
              <h3 className="text-xl font-bold">Humidity</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-300">{stats.humidity.avg.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">
                <span className="text-blue-200">Max: {stats.humidity.max.toFixed(1)}%</span>
                <span className="mx-2">|</span>
                <span className="text-cyan-200">Min: {stats.humidity.min.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Wind Speed Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <FaWind className="text-3xl text-cyan-400" />
              <h3 className="text-xl font-bold">Wind Speed</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-300">{stats.windSpeed.avg.toFixed(1)} m/s</div>
              <div className="text-sm text-gray-400">
                <span className="text-cyan-200">Max: {stats.windSpeed.max.toFixed(1)} m/s</span>
                <span className="mx-2">|</span>
                <span className="text-teal-200">Min: {stats.windSpeed.min.toFixed(1)} m/s</span>
              </div>
            </div>
          </div>

          {/* Solar Irradiance Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-4">
              <FaSun className="text-3xl text-yellow-400" />
              <h3 className="text-xl font-bold">Solar</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-300">{stats.solarIrradiance.avg.toFixed(0)} Wh/m²</div>
              <div className="text-sm text-gray-400">
                <span className="text-yellow-200">Max: {stats.solarIrradiance.max.toFixed(0)} Wh/m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-8">
          {/* Temperature Chart */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <WeatherChart
              data={processChartData(weatherData.properties.parameter.T2M)}
              title="Temperature (°C) - Daily Average"
              color="#f87171"
              unit="°C"
              gradient={["rgba(248, 113, 113, 0.5)", "rgba(248, 113, 113, 0.1)"]}
            />
          </div>

          {/* Humidity Chart */}
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <WeatherChart
              data={processChartData(weatherData.properties.parameter.RH2M)}
              title="Relative Humidity (%) - Daily Average"
              color="#60a5fa"
              unit="%"
              gradient={["rgba(96, 165, 250, 0.5)", "rgba(96, 165, 250, 0.1)"]}
            />
          </div>

          {/* Wind Speed Chart */}
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <WeatherChart
              data={processChartData(weatherData.properties.parameter.WS10M)}
              title="Wind Speed (m/s) - Daily Average"
              color="#22d3ee"
              unit="m/s"
              gradient={["rgba(34, 211, 238, 0.5)", "rgba(34, 211, 238, 0.1)"]}
            />
          </div>

          {/* Solar Irradiance Chart */}
          <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <WeatherChart
              data={processChartData(weatherData.properties.parameter.ALLSKY_SFC_SW_DWN)}
              title="Solar Irradiance (Wh/m²) - Daily Average"
              color="#fbbf24"
              unit="Wh/m²"
              gradient={["rgba(251, 191, 36, 0.5)", "rgba(251, 191, 36, 0.1)"]}
            />
          </div>
        </div>

        {/* Data Source Info */}
        <div className="mt-12 text-center text-gray-400 text-sm animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p>Data Source: NASA POWER API (Prediction Of Worldwide Energy Resources)</p>
          <p className="mt-2">Source: {weatherData.header.sources.join(", ")}</p>
          <p className="mt-1">API Version: {weatherData.header.api.version}</p>
        </div>
      </div>
    </div>
  );
}
