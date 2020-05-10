import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import React, { FC } from "react";
import { Coordinates } from "../types";

const Map = ReactMapboxGl({
  accessToken:
    // "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
    "pk.eyJ1Ijoia2FyaW1lc205NCIsImEiOiJjazlmdjA4cXUwaDRqM2VwZnB3a2EzNHo4In0.IyClnUcVqqynvp8Z2urDAQ",
});

interface MapProps {
  className?: string;
  center: Coordinates;
  options: Array<{
    id: string;
    type?: string;
    coordinates: Coordinates;
  }>;
  selected?: string | null | undefined;
  onSelect?: (id: string) => void;
  icons?: Record<string, string>;
  onLoad: () => void;
}

const FeatureMap: FC<MapProps> = ({
  center: defaultCenter,
  options,
  onSelect,
  selected,
  onLoad,
  className,
}) => {
  const selectedOption = options.find((option) => option.id === selected);
  let center = [defaultCenter.lng, defaultCenter.lat] as [number, number];
  if (selectedOption) {
    center = [selectedOption.coordinates.lng, selectedOption.coordinates.lat];
  }
  return (
    <Map
      className={className}
      style="mapbox://styles/karimesm94/ck9qod6wy03ff1ioea0vo5q7s"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      center={center} //TODO: maybe use useMemo? or change the center to whatever lat, long is for the object in Feature
      onStyleLoad={onLoad}
    >
      {options.map((o) => (
        <Marker
          key={o.id}
          onClick={(e) => onSelect?.(o.id)}
          coordinates={[o.coordinates.lng, o.coordinates.lat]}
        >
          <img
            src={"placeholder.svg"}
            height={32}
            width={32}
            style={{
              transition: "transform .5s",
              transform: selected === o.id ? "scale(1.5)" : "scale(1)",
              cursor: "pointer",
            }}
          />
        </Marker>
      ))}
    </Map>
  );
};

export default FeatureMap;
