import React, {FC} from 'react';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';

// export const LandingPage: FC = () => {
//     return (

//     )
// }

// const searchCompanies = async (
//     zip, 
//     {
//         distance = 10, 
//         businesses = ['coffee'],
//         includeDistance = true
//     }
// )

// const companies = searchCompanies('55402', {distance: 10, businesses: ['coffee'], includeDistance: true})



//when button is clicked:
//  1. fill in query params (zipcode, distance, business) and reroute: if valid params -> company listing page, else -> stay in landing page)
//  2. get latitude and longitude from entered zip code (api call?)
//  3. use this code https://levelup.gitconnected.com/nearby-location-queries-with-cloud-firestore-e7f4a2f18f9d and obtian from firebase list of companies in entered distance
//  4. from list of companies obtained, get latitude and longitude and call https://developers.google.com/maps/documentation/distance-matrix/ to obtain distances from entered zipcode 
//  5. Sort list of companies 


//for each company, save: latitude, longitud, geohash

//?zip=55402&businesses=coffee&distance=10

//For map:
//  can we set a max zoom out?  only allow zoom in/zoom out
//  in top right corner, allow user to change zip code + beer/coffee + distance 


