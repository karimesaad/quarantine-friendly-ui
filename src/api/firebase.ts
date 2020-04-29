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
const geocollection: GeoCollectionReference = geofirestore.collection(
  "companies"
);

//Add a GeoDocument to a GeoCollection
//lat: 44.97592, lng: -93.27223
// geocollection.add({
//   name: "northloop",
//   // The coordinates field must be a GeoPoint!
//   coordinates: new firebase.firestore.GeoPoint(44.97592, -93.27223),
// });

interface AddCompanyProps {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  website: string;
  pickup: boolean;
  delivery: boolean;
  socialMedia: {
    facebook: string;
    instagram: string;
  };
  // hours: {
  //   monday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   tuesday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   wednesday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   thursday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   friday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   saturday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  //   sunday: {
  //     startHour: string;
  //     endHour: string;
  //   };
  // };
}

export const addCompany = (props: AddCompanyProps) => {
  geocollection.add({
    name: props.name,
    address: props.address,
    zipcode: props.zipcode,
    city: "Minneapolis",
    state: "Minnesota",
    phoneNumber: props.phoneNumber,
    website: props.website,
    pickup: props.pickup,
    delivery: props.delivery,
    socialMedia: {
      facebook: props.socialMedia.facebook,
      instagram: props.socialMedia.instagram,
    },
    // hours: {
    //   monday: {
    //     startHour: props.hours.monday.startHour,
    //     endHour: props.hours.monday.endHour,
    //   },
    //   tuesday: {
    //     startHour: props.hours.tuesday.startHour,
    //     endHour: props.hours.tuesday.endHour,
    //   },
    //   wednesday: {
    //     startHour: props.hours.wednesday.startHour,
    //     endHour: props.hours.wednesday.endHour,
    //   },
    //   thursday: {
    //     startHour: props.hours.thursday.startHour,
    //     endHour: props.hours.thursday.endHour,
    //   },
    //   friday: {
    //     startHour: props.hours.friday.startHour,
    //     endHour: props.hours.friday.endHour,
    //   },
    //   saturday: {
    //     startHour: props.hours.saturday.startHour,
    //     endHour: props.hours.saturday.endHour,
    //   },
    //   sunday: {
    //     startHour: props.hours.sunday.startHour,
    //     endHour: props.hours.sunday.endHour,
    //   },
    // },
    coordinates: new firebase.firestore.GeoPoint(
      props.latitude,
      props.longitude
    ),
  });
};

interface Coordinates {
  lat: number;
  lng: number;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  website: string;
  pickup: boolean;
  delivery: boolean;
  socialMedia: {
    facebook: string;
    instagram: string;
  };
  coordinates: Coordinates;
}

export interface CompanyDistance {
  company: Company;
  distance: number;
}

// Create a GeoQuery based on a location
export const getCompanyDistances = async (
  coordinates: Coordinates,
  radius: number //radius in Miles
): Promise<CompanyDistance[]> => {
  const query = geocollection.near({
    center: new firebase.firestore.GeoPoint(coordinates.lat, coordinates.lng),
    radius: convertMiToKm(radius),
  });
  const response = await query.get(); // list of ids with distances

  const companyDistanceMap: Record<string, number> = {};
  response.docs.forEach((doc) => {
    companyDistanceMap[doc.id] = Number(convertKmToMi(doc.distance).toFixed(3));
  });

  const companies = await getCompaniesById(Object.keys(companyDistanceMap));

  const companyDistances: CompanyDistance[] = [];
  companies.forEach((company) => {
    companyDistances.push({
      company: company,
      distance: companyDistanceMap[company.id],
    });
  });
  return companyDistances.sort((a, b) => a.distance - b.distance);
};

const convertMiToKm = (miles: number) => {
  return miles * 1.609;
};

const convertKmToMi = (km: number) => {
  return km / 1.609;
};

export const getCompaniesById = async (ids: string[]): Promise<Company[]> => {
  if (ids.length === 0) {
    return [];
  }
  const documents = await firestore
    .collection("companies")
    .where(firebase.firestore.FieldPath.documentId(), "in", ids)
    .get();

  const companies: Company[] = [];
  documents.forEach((doc) => {
    const companyData = doc.data().d;
    companies.push({
      id: doc.id,
      name: companyData.name,
      address: companyData.address,
      zipcode: companyData.zipcode,
      city: companyData.city,
      state: companyData.state,
      latitude: companyData.coordinates.latitude,
      longitude: companyData.coordinates.longitude,
      phoneNumber: companyData.phoneNumber,
      website: companyData.website,
      pickup: companyData.pickup,
      delivery: companyData.delivery,
      socialMedia: {
        facebook: companyData.socialMedia.facebook,
        instagram: companyData.socialMedia.instagram,
      },
      coordinates: {
        lat: companyData.coordinates.latitude,
        lng: companyData.coordinates.longitude,
      },
    });
  });
  return companies;
};
