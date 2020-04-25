import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React, { FC } from "react";
import { Coordinates } from "../types";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
});

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="20px" height="17px" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Cycle_Hire_Logo</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Cycle_Hire_Logo">
            <rect id="rect17" x="0" y="6.22699387" width="20" height="4.38650307"></rect>
            <path d="M18.2515337,8.38957234 C18.2515337,13.0228585 14.5436104,16.7791411 9.96961789,16.7791411 C5.39562517,16.7791411 1.68711656,13.0228585 1.68711656,8.38957234 C1.68711656,3.75598996 5.39562517,0 9.96961789,0 C14.5436104,0 18.2515337,3.75569357 18.2515337,8.38957234" id="path19"></path>
            <path d="M14.8512661,8.42009806 C14.8512661,11.1360369 12.6778217,13.3391758 10,13.3391758 C7.3221781,13.3391758 5.15078177,11.1360369 5.15078177,8.42009806 C5.15078177,5.70415964 7.3221781,3.50102053 10,3.50102053 C12.6778217,3.50102053 14.8512661,5.70386277 14.8512661,8.42009806 M10,0.797546012 C5.84912763,0.797546012 2.48466258,4.20968116 2.48466258,8.42009806 C2.48466258,12.6305154 5.84912763,16.0429448 10,16.0429448 C14.1505798,16.0429448 17.5153374,12.6305154 17.5153374,8.42009806 C17.5153374,4.20968116 14.150287,0.797546012 10,0.797546012" id="path21" fill="#009EE0" fill-rule="nonzero"></path>
            <rect id="rect23" fill="#00275B" fill-rule="nonzero" x="0.736196319" y="6.87116564" width="18.4969325" height="3.06748466"></rect>
            <path d="M5.33742331,9.07964424 C5.17974293,9.18246407 4.9978041,9.23312883 4.79634024,9.23312883 C4.55405108,9.23312883 4.35524971,9.152661 4.19549859,8.99202388 C4.0366347,8.83138656 3.95705521,8.63319757 3.95705521,8.39566928 C3.95705521,8.16588919 4.0366347,7.9715746 4.19845675,7.81361953 C4.3590953,7.65536652 4.56026348,7.57668712 4.80077778,7.57668712 C4.98389992,7.57668712 5.16258451,7.6243717 5.33712764,7.71795243 L5.33712764,8.03177641 C5.16850123,7.91792945 4.99869173,7.86100597 4.82858634,7.86100597 C4.66587686,7.86100597 4.53245512,7.91256515 4.42772936,8.01419263 C4.32300341,8.1173106 4.27064053,8.24605888 4.27064053,8.40073543 C4.27064053,8.55690228 4.31974937,8.68624664 4.42181264,8.78966255 C4.52269241,8.89218444 4.65611435,8.94374322 4.81438609,8.94374322 C4.99632492,8.94374322 5.16968454,8.88383956 5.33742331,8.76522418 L5.33742331,9.07964424 L5.33742331,9.07964424 Z" id="path25" fill="#FFFFFF" fill-rule="nonzero"></path>
            <polygon id="polygon27" fill="#FFFFFF" fill-rule="nonzero" points="5.78553941 7.60736196 6.12256511 8.21193405 6.46193738 7.60736196 6.80981595 7.60736196 6.27655858 8.53047524 6.27655858 9.20245399 5.97033157 9.20245399 5.97033157 8.53047524 5.42944785 7.60736196"></polygon>
            <path d="M8.1595092,9.07964424 C8.0020652,9.18246407 7.8203989,9.23312883 7.61628288,9.23312883 C7.3767197,9.23312883 7.17703418,9.152661 7.01811322,8.99202388 C6.85948769,8.83138656 6.7791411,8.63319757 6.7791411,8.39566928 C6.7791411,8.16588919 6.86155532,7.9715746 7.02106715,7.81361953 C7.18323767,7.65536652 7.38410433,7.57668712 7.62307664,7.57668712 C7.80444771,7.57668712 7.98404639,7.6243717 8.15921397,7.71795243 L8.15921397,8.03177641 C7.99024948,7.91792945 7.82069433,7.86100597 7.64907135,7.86100597 C7.48778712,7.86100597 7.35456502,7.91256515 7.2497009,8.01419263 C7.14513201,8.1173106 7.0922567,8.24605888 7.0922567,8.40073543 C7.0922567,8.55690228 7.14306438,8.68624664 7.24497457,8.78966255 C7.3462941,8.89218444 7.47744836,8.94374322 7.63814172,8.94374322 C7.8177404,8.94374322 7.99172645,8.88383956 8.15921397,8.76522418 L8.15921397,9.07964424 L8.1595092,9.07964424 Z" id="path29" fill="#FFFFFF" fill-rule="nonzero"></path>
            <polygon id="polygon31" fill="#FFFFFF" fill-rule="nonzero" points="8.67823725 7.60736196 8.67823725 8.91075616 9.32515337 8.91075616 9.32515337 9.20245399 8.37423313 9.20245399 8.37423313 7.60736196"></polygon>
            <polygon id="polygon33" fill="#FFFFFF" fill-rule="nonzero" points="10.4915109 7.60736196 10.4915109 7.88444508 9.8185956 7.88444508 9.8185956 8.21730272 10.3743793 8.21730272 10.3743793 8.49766669 9.8185956 8.49766669 9.8185956 8.91910742 10.5521472 8.91910742 10.5521472 9.20245399 9.50920245 9.20245399 9.50920245 7.60736196"></polygon>
            <polygon id="polygon35" fill="#FFFFFF" fill-rule="nonzero" points="11.6534319 8.49915799 11.6534319 9.20245399 11.3496933 9.20245399 11.3496933 7.60736196 11.6534319 7.60736196 11.6534319 8.21730272 12.3646816 8.21730272 12.3646816 7.60736196 12.6687117 7.60736196 12.6687117 9.20245399 12.3646816 9.20245399 12.3646816 8.49915799"></polygon>
            <path d="M14.7852761,9.20245399 L14.4286491,9.20245399 L14.0002901,8.56686297 L13.8603114,8.56686297 L13.8603114,9.20245399 L13.5582822,9.20245399 L13.5582822,7.60736196 L14.0595344,7.60736196 C14.2241985,7.60736196 14.3522706,7.65001324 14.4472355,7.73352578 C14.5430717,7.81733669 14.5918611,7.93007887 14.5918611,8.07354174 C14.5918611,8.17137063 14.5639814,8.25846261 14.5140304,8.3306415 C14.4623369,8.40431144 14.3906051,8.45829657 14.2962209,8.49528082 L14.7852761,9.20245399 Z M13.860602,7.87818173 L13.860602,8.29783282 L14.0058083,8.29783282 C14.0955456,8.29783282 14.1637926,8.27695474 14.2140342,8.23728635 C14.263985,8.19940719 14.2872183,8.14482572 14.2872183,8.07533116 C14.2872183,8.01418795 14.2657275,7.96587005 14.2201327,7.93007887 C14.1774423,7.89607732 14.1150032,7.87818173 14.0339781,7.87818173 L13.860602,7.87818173 L13.860602,7.87818173 Z" id="path39" fill="#FFFFFF" fill-rule="nonzero"></path>
            <polygon id="polygon41" fill="#FFFFFF" fill-rule="nonzero" points="15.9533415 7.60736196 15.9533415 7.88444508 15.2772929 7.88444508 15.2772929 8.21730272 15.8354846 8.21730272 15.8354846 8.49766669 15.2772929 8.49766669 15.2772929 8.91910742 16.0122699 8.91910742 16.0122699 9.20245399 14.9693252 9.20245399 14.9693252 7.60736196"></polygon>
        </g>
    </g>
</svg>`;

// Create an image for the Layer
const image = new Image();
image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(svg);

interface MapProps {
  center: Coordinates;
  options: Array<{
    id: string;
    type?: string;
    coordinates: Coordinates;
  }>;
  selected?: string;
  onSelect?: (id: string) => void;
  icons?: Record<string, string>;
}

const FeatureMap: FC<MapProps> = ({ center, options }) => {
  return (
    <Map
      style="mapbox://styles/mapbox/light-v9"
      containerStyle={{
        height: "50vh",
        width: "80vw",
      }}
      center={[center.lng, center.lat]}
    >
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "cafe-11" }}
        images={["cafe-11", image]}
      >
        {options.map((o) => (
          <Feature
            key={o.id}
            coordinates={[o.coordinates.lng, o.coordinates.lat]}
          />
        ))}
      </Layer>
    </Map>
  );
};

export default FeatureMap;

// import * as React from 'react';
// import ReactMapboxGl, { Layer, Feature, Popup } from '../../../';
// import styled from 'styled-components';
// import { londonCycleMaxBounds as maxBounds } from './data';
// import { svg } from './cycle';
// import { Station, getCycleStations, StationDict } from './londonCycleData';

// // tslint:disable-next-line:no-var-requires
// const { token, styles } = require('./config.json');

// const Mapbox = ReactMapboxGl({
//   minZoom: 8,
//   maxZoom: 15,
//   accessToken: token
// });

// const mapStyle = {
//   flex: 1
// };

// // Define layout to use in Layer component
// const layoutLayer = { 'icon-image': 'londonCycle' };

// // Create an image for the Layer
// const image = new Image();
// image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
// const images: any = ['londonCycle', image];

// const StyledPopup = styled.div`
//   background: white;
//   color: #3f618c;
//   font-weight: 400;
//   padding: 5px;
//   border-radius: 2px;
// `;

// export interface State {
//   fitBounds?: [[number, number], [number, number]];
//   center: [number, number];
//   zoom: [number];
//   station?: Station;
//   stations: StationDict;
// }

// const flyToOptions = {
//   speed: 0.8
// };

// export interface Props {
//   // tslint:disable-next-line:no-any
//   onStyleLoad?: (map: any) => any;
// }

// export default class LondonCycle extends React.Component<Props, State> {
//   public state: State = {
//     fitBounds: undefined,
//     center: [-0.109970527, 51.52916347],
//     zoom: [11],
//     station: undefined,
//     stations: {}
//   };

//   public UNSAFE_componentWillMount() {
//     getCycleStations().then(res => {
//       this.setState(({ stations }) => ({
//         stations: {
//           ...stations,
//           ...res
//         }
//       }));
//     });
//   }

//   private onDrag = () => {
//     if (this.state.station) {
//       this.setState({ station: undefined });
//     }
//   };

//   private onToggleHover(cursor: string, { map }: { map: any }) {
//     map.getCanvas().style.cursor = cursor;
//   }

//   private markerClick = (station: Station, { feature }: { feature: any }) => {
//     this.setState({
//       center: feature.geometry.coordinates,
//       zoom: [14],
//       station
//     });
//   };

//   private onStyleLoad = (map: any) => {
//     const { onStyleLoad } = this.props;
//     return onStyleLoad && onStyleLoad(map);
//   };

//   public render() {
//     const { fitBounds, center, zoom, stations, station } = this.state;

//     return (
//       <Mapbox
//         style={styles.londonCycle}
//         onStyleLoad={this.onStyleLoad}
//         fitBounds={fitBounds}
//         maxBounds={maxBounds}
//         center={center}
//         zoom={zoom}
//         onDrag={this.onDrag}
//         containerStyle={mapStyle}
//         flyToOptions={flyToOptions}
//       >
//         <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
//           {Object.keys(stations).map((stationK, index) => (
//             <Feature
//               key={stationK}
//               onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
//               onMouseLeave={this.onToggleHover.bind(this, '')}
//               onClick={this.markerClick.bind(this, stations[stationK])}
//               coordinates={stations[stationK].position}
//             />
//           ))}
//         </Layer>
//         {station && (
//           <Popup key={station.id} coordinates={station.position}>
//             <StyledPopup>
//               <div>{station.name}</div>
//               <div>
//                 {station.bikes} bikes / {station.slots} slots
//               </div>
//             </StyledPopup>
//           </Popup>
//         )}
//       </Mapbox>
//     );
//   }
// }
