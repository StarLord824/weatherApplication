// Example: Get city and coordinates from IP
export default async function getLocationFromIP() {
  const response = await fetch("https://ip-api.io/json");
  if (!response.ok) throw new Error("Failed to fetch location");
  const data = await response.json();
  // Example response: { city: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777, ... }
  return {
    city: data.city,
    lat: data.latitude,
    lon: data.longitude,
  };
}

// Usage
getLocationFromIP().then(console.log).catch(console.error);