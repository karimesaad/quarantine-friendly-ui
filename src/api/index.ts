import React from "react";
import { getCoordinatesFromZipCode } from "./location";
import * as firebase from "./firebase";
import { Coordinates } from "../types";

export type CompanyDistance = firebase.CompanyDistance;
export { getCompanyDistances } from "./firebase";
export { getCoordinatesFromZipCode } from "./location";
export { addCompany } from "./firebase";

// export const getCompanyDistances = async (zipcode: string, radiusKm: number) => {
//     const coordinates = await getCoordinatesFromZipCode(zipcode)
//     const companyDistances = await firebase.getCompanyDistances(coordinates, radiusKm)
//     return companyDistances
// }
