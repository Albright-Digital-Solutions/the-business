// Geographic Coordinates for Jarrell, TX
const JARRELL_COORDS = {
  lat: 30.8282,
  lon: -97.5855
};

const SERVICE_RADIUS_MILES = 50;

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 */
function getDistanceFromLatLonInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

/**
 * Validates if a given address string falls within the 50-mile radius of Jarrell, TX.
 * Uses the free OpenStreetMap Nominatim API for geocoding.
 * 
 * @param address - The freeform address string provided by the user.
 * @returns An object containing a boolean `isValid` and an optional `error` message.
 */
export async function validateServiceArea(address: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    // Prevent empty queries
    if (!address || address.trim().length < 5) {
      return { isValid: false, error: 'Please enter a valid, complete address.' };
    }

    // Nominatim API requires a User-Agent header and respects rate limits (1 req/sec)
    // We encode the address to make it URL safe
    const query = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        // Provide a unique user agent to comply with Nominatim's loosely-enforced guidelines
        'User-Agent': 'GarageRecoverySolutions/1.0 (+https://the-business.vercel.app)'
      }
    });

    if (!response.ok) {
        throw new Error('Geocoding service unavailable.');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return { 
        isValid: false, 
        error: "We couldn't locate that address automatically. Please double check for typos." 
      };
    }

    const userLat = parseFloat(data[0].lat);
    const userLon = parseFloat(data[0].lon);

    const distance = getDistanceFromLatLonInMiles(
      JARRELL_COORDS.lat, 
      JARRELL_COORDS.lon, 
      userLat, 
      userLon
    );

    // If they are strictly greater than standard mileage
    if (distance > SERVICE_RADIUS_MILES) {
      return {
        isValid: false,
        error: `Address is approximately ${Math.round(distance)} miles from our Jarrell, TX hub. You are outside of our standard 50-mile service area. Please call 512-814-8825 for custom pricing.`
      };
    }

    return { isValid: true };

  } catch (err: any) {
    console.error('Error validating service area:', err);
    // Fail gracefully/open if the API goes down so we don't block legitimate leads
    return { isValid: true }; 
  }
}
