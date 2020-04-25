import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from "geofirestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyIPtzkgN5JSMivxeAEYVlwddLzYxdmcQ",
  authDomain: "quarantine-friendly.firebaseapp.com",
  databaseURL: "https://quarantine-friendly.firebaseio.com",
  projectId: "quarantine-friendly",
  storageBucket: "quarantine-friendly.appspot.com",
  messagingSenderId: "808672146512",
  appId: "1:808672146512:web:4de3ae2af91d67f2258d55",
  measurementId: "G-4FDSE81366",
};

firebase.initializeApp(firebaseConfig);

// var db = firebase.firestore();
// db.collection("items").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//     });
// });

const firestore = firebase.firestore();

// Create a GeoFirestore reference
//https://geofirestore.com/
const geofirestore: GeoFirestore = new GeoFirestore(firestore);

// Create a GeoCollection reference
const geocollection: GeoCollectionReference = geofirestore.collection("items");

// Add a GeoDocument to a GeoCollection
//lat: 44.97592, lng: -93.27223
// geocollection.add({
//   name: "northloop",
//   // The coordinates field must be a GeoPoint!
//   coordinates: new firebase.firestore.GeoPoint(44.97592, -93.27223),
// });

interface Coordinates {
  lat: number;
  lng: number;
}

export interface Company {
  id: string;
  name: string;
  coordinates: Coordinates;
}

export interface CompanyDistance {
  company: Company;
  distanceKm: number;
}

// Create a GeoQuery based on a location
export const getCompanyDistances = async (
  coordinates: Coordinates,
  radiusKm: number
): Promise<CompanyDistance[]> => {
  const query = geocollection.near({
    center: new firebase.firestore.GeoPoint(coordinates.lat, coordinates.lng),
    radius: radiusKm,
  });
  const response = await query.get(); // list of ids with distances
  console.log(response);

  const companyDistanceMap: Record<string, number> = {};
  response.docs.forEach((doc) => {
    companyDistanceMap[doc.id] = doc.distance;
  });

  const companies = await getCompaniesById(Object.keys(companyDistanceMap));

  const companyDistances: CompanyDistance[] = [];
  companies.forEach((company) => {
    companyDistances.push({
      company: company,
      distanceKm: companyDistanceMap[company.id],
    });
  });
  return companyDistances.sort((a, b) => a.distanceKm - b.distanceKm);
};

export const getCompaniesById = async (ids: string[]): Promise<Company[]> => {
    if (ids.length === 0 ) {
        return []
    }
  const documents = await firestore
    .collection("items")
    .where(firebase.firestore.FieldPath.documentId(), "in", ids)
    .get();

  const companies: Company[] = [];
  documents.forEach((doc) => {
    const companyData = doc.data().d;
    companies.push({
      id: doc.id,
      name: companyData.name,
      coordinates: {
        lat: companyData.coordinates.latitude,
        lng: companyData.coordinates.longitude,
      },
    });
    console.log(doc.data());
  });
  return companies;
};
