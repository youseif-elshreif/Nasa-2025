// API configuration
const API_BASE_URL = "http://10.20.164.134:5000";

export interface CityMetrics {
  concrete_coverage: number;
  vegetation_coverage: number;
  water_coverage: number;
  building_density: number;
  industrial_buildings: number;
  tree_coverage: number;
  solar_panel_coverage: number;
  wind_turbine_density: number;
  residential_buildings: number;
  traffic_density: number;
  latitude: number;
  longitude: number;
  hour_of_day: number;
}

export interface PredictionResponse {
  temperature: {
    predicted_temperature?: number;
    predicted?: number;
    uhi_intensity?: number;
    base_temperature?: number;
    base?: number;
    factors?: Record<string, number>;
    confidence?: number;
    data_source?: string;
    satellite_data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    status?: string;
    weather_conditions?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  air_quality: {
    air_quality_index?: number;
    aqi?: number;
    category?: string;
    health_implications?: string;
    humidity_effect?: number;
    pollution_sinks?: number;
    pollution_sources?: number;
    sinks?: Record<string, number>;
    sources?: Record<string, number>;
    recommendations?: string[];
    status?: string;
    weather_conditions?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    wind_effect?: number;
  };
  energy: {
    balance?: number;
    energy_balance?: number;
    production?: {
      solar?: number;
      wind?: number;
      total?: number;
    };
    consumption?: number;
    total_consumption?: number;
    total_production?: number;
    solar_production?: number;
    wind_production?: number;
    solar_efficiency?: number;
    wind_efficiency?: number;
    consumption_multiplier?: number;
    renewable_percentage?: number;
    sustainability?: number;
    sustainability_score?: number;
    status?: string;
    weather_conditions?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  scores: {
    overall?: number;
    overall_score?: number;
    temperature?: number;
    temperature_score?: number;
    air_quality?: number;
    air_quality_score?: number;
    energy?: number;
    energy_score?: number;
  };
  recommendations?: string[];
  data_sources?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  status?: string;
  improvement_suggestions?: string[];
}

export async function predictEnvironmentalImpact(
  metrics: CityMetrics
): Promise<PredictionResponse> {
  try {
    const requestUrl = `${API_BASE_URL}/predict/complete`;
    const requestBody = JSON.stringify(metrics, null, 2);

    // Log the request
    console.log("=".repeat(80));
    console.log("📤 API REQUEST");
    console.log("=".repeat(80));
    console.log("URL:", requestUrl);
    console.log("Method: POST");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Headers:", {
      "Content-Type": "application/json",
    });
    console.log("Request Body:");
    console.log(requestBody);
    console.log("=".repeat(80));

    const requestStartTime = performance.now();

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const requestEndTime = performance.now();
    const requestDuration = (requestEndTime - requestStartTime).toFixed(2);

    if (!response.ok) {
      console.log("=".repeat(80));
      console.log("❌ API RESPONSE ERROR");
      console.log("=".repeat(80));
      console.log("Status:", response.status, response.statusText);
      console.log("Duration:", requestDuration, "ms");
      console.log("Timestamp:", new Date().toISOString());
      console.log("=".repeat(80));
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Log the response
    console.log("=".repeat(80));
    console.log("📥 API RESPONSE SUCCESS");
    console.log("=".repeat(80));
    console.log("Status:", response.status, response.statusText);
    console.log("Duration:", requestDuration, "ms");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Response Data:");
    console.log(JSON.stringify(data, null, 2));
    console.log("=".repeat(80));
    console.log("\n");

    return data;
  } catch (error) {
    console.log("=".repeat(80));
    console.log("💥 API ERROR");
    console.log("=".repeat(80));
    console.log("Error:", error);
    console.log(
      "Error Message:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.log("Timestamp:", new Date().toISOString());
    console.log("=".repeat(80));
    console.log("\n");
    console.error("Environmental prediction error:", error);
    throw error;
  }
}

// Helper function to calculate city metrics from game elements
export function calculateCityMetrics(
  elements: Array<{ type: string }>,
  latitude: number = 30.0444, // Cairo, Egypt default
  longitude: number = 31.2357
): CityMetrics {
  const counts = {
    house: 0,
    factory: 0,
    tree: 0,
    solar: 0,
    wind: 0,
    waste: 0,
  };

  elements.forEach((el) => {
    if (el.type in counts) {
      counts[el.type as keyof typeof counts]++;
    }
  });

  // Calculate coverage/density values (0-1 range)
  // Maximum of 10 elements per type
  const MAX_PER_TYPE = 10;

  // Calculate percentages: count/10 for each type
  const residential_buildings = Math.min(counts.house / MAX_PER_TYPE, 1);
  const industrial_buildings = Math.min(counts.factory / MAX_PER_TYPE, 1);
  const tree_coverage = Math.min(counts.tree / MAX_PER_TYPE, 1);
  const solar_panel_coverage = Math.min(counts.solar / MAX_PER_TYPE, 1);
  const wind_turbine_density = Math.min(counts.wind / MAX_PER_TYPE, 1);
  const waste_density = Math.min(counts.waste / MAX_PER_TYPE, 1);

  // Calculate derived metrics
  const building_density = Math.min(
    (residential_buildings + industrial_buildings) / 2,
    1
  );
  const concrete_coverage = Math.min(building_density + waste_density * 0.5, 1);
  const vegetation_coverage = Math.min(tree_coverage, 1); // Trees represent vegetation
  const water_coverage = 0.05; // Default small water coverage
  const traffic_density = Math.min(
    (residential_buildings + industrial_buildings) * 0.4,
    1
  ); // Traffic correlates with buildings

  // Get current hour
  const hour_of_day = new Date().getHours();

  return {
    concrete_coverage: Math.min(concrete_coverage, 1),
    vegetation_coverage: Math.min(vegetation_coverage, 1),
    water_coverage,
    building_density: Math.min(building_density, 1),
    industrial_buildings,
    tree_coverage,
    solar_panel_coverage,
    wind_turbine_density,
    residential_buildings,
    traffic_density: Math.min(traffic_density, 1),
    latitude,
    longitude,
    hour_of_day,
  };
}

// Legacy function for backward compatibility
export async function trainAndPredict(pollutionOffset = 0): Promise<string> {
  // This is now a simplified wrapper
  const defaultMetrics: CityMetrics = {
    concrete_coverage: 0.3 + pollutionOffset * 0.1,
    vegetation_coverage: 0.4 - pollutionOffset * 0.1,
    water_coverage: 0.1,
    building_density: 0.5,
    industrial_buildings: 0.2,
    tree_coverage: 0.25,
    solar_panel_coverage: 0.15,
    wind_turbine_density: 0.05,
    residential_buildings: 0.3,
    traffic_density: 0.1,
    latitude: 30.0444,
    longitude: 31.2357,
    hour_of_day: 14,
  };

  try {
    const result = await predictEnvironmentalImpact(defaultMetrics);
    return (
      result.temperature.predicted ??
      result.temperature.predicted_temperature ??
      0
    ).toFixed(2);
  } catch (error) {
    console.error("Prediction error:", error);
    return "N/A";
  }
}
