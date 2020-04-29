import React, { FC, useState } from "react";
import { Select, Option } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

interface LandingPageProps {
  onSubmit: (obj: { zipcode: string; radius: number }) => void;
}

const radiusOptions: Option[] = [
  { label: "5 Miles", id: "0" },
  { label: "10 Miles", id: "1" },
  { label: "15 Miles", id: "2" },
  { label: "20 Miles", id: "3" },
];

const radiusMiles: Record<string, number> = {
  "0": 5,
  "1": 10,
  "2": 15,
  "3": 20,
};

const LandingPage: FC<LandingPageProps> = ({ onSubmit }) => {
  const [zipcode, setZipcode] = useState<string>("");
  const [radiusOption, setRadiusOption] = useState<Option>();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ width: "75%", maxWidth: 400 }}>
        <div style={{ padding: "12px 0" }}>
          <Input
            value={zipcode}
            onChange={(e) => setZipcode(e.currentTarget.value)}
            placeholder="Zipcode"
          />
        </div>
        <div style={{ padding: "12px 0" }}>
          <Select
            options={radiusOptions}
            value={radiusOption !== undefined ? [radiusOption] : []}
            placeholder="Radius"
            onChange={(e) => setRadiusOption(e.option as Option)}
          />
        </div>
        <div style={{ padding: "12px 0" }}>
          <Button
            disabled={zipcode.length < 5 || radiusOption === undefined}
            onClick={(e) =>
              onSubmit({
                zipcode: zipcode as string,
                radius: radiusMiles[radiusOption?.id as string],
              })
            }
          >
            <span>---></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
