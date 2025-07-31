// Simplified geocoding using Open-Meteo Geocoding API
export async function getCityCoordinates(
  city: string
): Promise<{ city: string; lat: number; lon: number }> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    if (!data.results?.[0]) {
      throw new Error("City not found");
    }

    return {
      city,
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  } catch (error) {
    console.error("Error getting city coordinates:", error);
    throw error;
  }
}
