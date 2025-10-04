// NASA POWER API Functions for Egypt Weather Data
// Location: Giza, Egypt (Latitude: 31.2001, Longitude: 29.9187)
// Period: October 1, 2024 to October 1, 2025

// Type definitions
interface PowerApiResponse {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  properties: {
    parameter: {
      [key: string]: {
        [timestamp: string]: number;
      };
    };
  };
  header: {
    title: string;
    api: {
      version: string;
      name: string;
    };
    sources: string[];
    fill_value: number;
    time_standard: string;
    start: string;
    end: string;
  };
  messages: string[];
  parameters: {
    [key: string]: {
      units: string;
      longname: string;
    };
  };
  times: {
    data: number;
    process: number;
  };
}

// Fixed configuration - NO PARAMETERS NEEDED
const CONFIG = {
  latitude: 31.2001,
  longitude: 29.9187,
  start: '20241001',
  end: '20251001',
  community: 're',
  format: 'json',
  units: 'metric',
  header: 'true',
  timeStandard: 'utc',
};

const BASE_URL = 'https://power.larc.nasa.gov/api/temporal/hourly/point';

// Helper function to build query string
const buildQueryString = (params: Record<string, string | number>): string => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

/**
 * API 1: Temperature at 2 Meters (T2M)
 * Returns air temperature at 2 meters above ground level in Celsius
 * Fixed period: Oct 1, 2024 - Oct 1, 2025
 */
export const getTemperatureData = async (): Promise<PowerApiResponse> => {
  const queryParams = {
    start: CONFIG.start,
    end: CONFIG.end,
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    community: CONFIG.community,
    parameters: 'T2M',
    format: CONFIG.format,
    units: CONFIG.units,
    header: CONFIG.header,
    'time-standard': CONFIG.timeStandard,
  };

  const url = `${BASE_URL}?${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Temperature API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * API 2: Relative Humidity at 2 Meters (RH2M)
 * Returns relative humidity at 2 meters above ground level in percentage
 * Fixed period: Oct 1, 2024 - Oct 1, 2025
 */
export const getHumidityData = async (): Promise<PowerApiResponse> => {
  const queryParams = {
    start: CONFIG.start,
    end: CONFIG.end,
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    community: CONFIG.community,
    parameters: 'RH2M',
    format: CONFIG.format,
    units: CONFIG.units,
    header: CONFIG.header,
    'time-standard': CONFIG.timeStandard,
  };

  const url = `${BASE_URL}?${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Humidity API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * API 3: Wind Speed at 10 Meters (WS10M)
 * Returns wind speed at 10 meters above ground level in m/s
 * Fixed period: Oct 1, 2024 - Oct 1, 2025
 */
export const getWindSpeedData = async (): Promise<PowerApiResponse> => {
  const queryParams = {
    start: CONFIG.start,
    end: CONFIG.end,
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    community: CONFIG.community,
    parameters: 'WS10M',
    format: CONFIG.format,
    units: CONFIG.units,
    header: CONFIG.header,
    'time-standard': CONFIG.timeStandard,
  };

  const url = `${BASE_URL}?${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Wind Speed API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * API 4: All Sky Surface Shortwave Downward Irradiance (ALLSKY_SFC_SW_DWN)
 * Returns solar irradiance in Wh/m^2
 * Fixed period: Oct 1, 2024 - Oct 1, 2025
 */
export const getSolarIrradianceData = async (): Promise<PowerApiResponse> => {
  const queryParams = {
    start: CONFIG.start,
    end: CONFIG.end,
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    community: CONFIG.community,
    parameters: 'ALLSKY_SFC_SW_DWN',
    format: CONFIG.format,
    units: CONFIG.units,
    header: CONFIG.header,
    'time-standard': CONFIG.timeStandard,
  };

  const url = `${BASE_URL}?${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Solar Irradiance API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * BONUS: Get ALL Weather Parameters at Once
 * Returns all 4 parameters in a single API call
 * Fixed period: Oct 1, 2024 - Oct 1, 2025
 */
export const getAllWeatherData = async (): Promise<PowerApiResponse> => {
  const queryParams = {
    start: CONFIG.start,
    end: CONFIG.end,
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    community: CONFIG.community,
    parameters: 'T2M,RH2M,WS10M,ALLSKY_SFC_SW_DWN',
    format: CONFIG.format,
    units: CONFIG.units,
    header: CONFIG.header,
    'time-standard': CONFIG.timeStandard,
  };

  const url = `${BASE_URL}?${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`All Weather Data API error: ${response.status}`);
  }

  return await response.json();
};

export type { PowerApiResponse };
