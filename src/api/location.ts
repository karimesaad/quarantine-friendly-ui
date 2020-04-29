import axios from "axios";

interface Coordinates {
  lat: number;
  lng: number;
}

export const getCoordinatesFromZipCode = async (
  zipcode: string
): Promise<Coordinates> => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: zipcode,
        key: "AIzaSyBrQ-TlGtPrbxWm7i0P2RUCP1_bsgje3PY",
      },
    }
  );
  if (response.data.error_message || response.data.results.length === 0) {
    return Promise.reject({
      message: response.data.error_message,
      status: response.data.status,
    });
  }
  return response.data.results[0].geometry.location;
};
