import axios from "axios";
//https://maps.googleapis.com/maps/api/geocode/json?address=55402&key=AIzaSyAoo2pfYTr-XNiyANd0dlMA6Q1TCYtvmsc
//https://developers.google.com/maps/documentation/geocoding/intro

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
        key: "AIzaSyAoo2pfYTr-XNiyANd0dlMA6Q1TCYtvmsc",
      },
    }
  );

  return response.data.results[0].geometry.location;
};
