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

interface AddCompanyProps extends Omit<Company, "coordinates" | "id"> {}

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
    hours: {
      monday: {
        startTime: props.hours.monday.startTime,
        endTime: props.hours.monday.endTime,
      },
      tuesday: {
        startTime: props.hours.tuesday.startTime,
        endTime: props.hours.tuesday.endTime,
      },
      wednesday: {
        startTime: props.hours.wednesday.startTime,
        endTime: props.hours.wednesday.endTime,
      },
      thursday: {
        startTime: props.hours.thursday.startTime,
        endTime: props.hours.thursday.endTime,
      },
      friday: {
        startTime: props.hours.friday.startTime,
        endTime: props.hours.friday.endTime,
      },
      saturday: {
        startTime: props.hours.saturday.startTime,
        endTime: props.hours.saturday.endTime,
      },
      sunday: {
        startTime: props.hours.sunday.startTime,
        endTime: props.hours.sunday.endTime,
      },
    },
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
  hours: {
    monday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    tuesday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    wednesday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    thursday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    friday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    saturday: {
      startTime: Date | null;
      endTime: Date | null;
    };
    sunday: {
      startTime: Date | null;
      endTime: Date | null;
    };
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
    console.log(doc);
    companyDistanceMap[doc.id] = Number(convertKmToMi(doc.distance).toFixed(2));
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
  const documents = await queryCollectionByIds("companies", ids);

  const companies: Company[] = [];
  documents.forEach((doc) => {
    const companyData = doc.data().d;
    console.log(companyData);
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
      hours: {
        monday: {
          startTime: companyData.hours.monday.startTime
            ? new Date(companyData.hours.monday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.monday.endTime
            ? new Date(companyData.hours.monday.endTime.seconds * 1000)
            : null,
        },
        tuesday: {
          startTime: companyData.hours.tuesday.startTime
            ? new Date(companyData.hours.tuesday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.tuesday.endTime
            ? new Date(companyData.hours.tuesday.endTime.seconds * 1000)
            : null,
        },
        wednesday: {
          startTime: companyData.hours.wednesday.startTime
            ? new Date(companyData.hours.wednesday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.wednesday.endTime
            ? new Date(companyData.hours.wednesday.endTime.seconds * 1000)
            : null,
        },
        thursday: {
          startTime: companyData.hours.thursday.startTime
            ? new Date(companyData.hours.thursday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.thursday.endTime
            ? new Date(companyData.hours.thursday.endTime.seconds * 1000)
            : null,
        },
        friday: {
          startTime: companyData.hours.friday.startTime
            ? new Date(companyData.hours.friday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.friday.endTime
            ? new Date(companyData.hours.friday.endTime.seconds * 1000)
            : null,
        },
        saturday: {
          startTime: companyData.hours.saturday.startTime
            ? new Date(companyData.hours.saturday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.saturday.endTime
            ? new Date(companyData.hours.saturday.endTime.seconds * 1000)
            : null,
        },
        sunday: {
          startTime: companyData.hours.sunday.startTime
            ? new Date(companyData.hours.sunday.startTime.seconds * 1000)
            : null,
          endTime: companyData.hours.sunday.endTime
            ? new Date(companyData.hours.sunday.endTime.seconds * 1000)
            : null,
        },
      },
      coordinates: {
        lat: companyData.coordinates.latitude,
        lng: companyData.coordinates.longitude,
      },
    });
  });
  return companies;
};

var chunks = function <T extends any[]>(array: T, size: number) {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
};

const queryCollectionByIds = async (
  name: string,
  ids: string[]
): Promise<firebase.firestore.DocumentData[]> => {
  const documentChunks = chunks(ids, 10);
  console.log(documentChunks);
  const promises = documentChunks.map((chunk) =>
    firestore
      .collection("companies")
      .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
      .get()
  );
  let documents: firebase.firestore.DocumentData[] = [];
  for (const promise of promises) {
    documents = [...documents, ...(await promise).docs];
  }
  return documents;
};
