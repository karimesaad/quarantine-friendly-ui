import React, { FC, useState } from "react";
import { Select, Option } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import styles from "./LandingPage.module.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
    <div className={styles.root}>
      <div className={styles.title}> Quarantine Friendly </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <Input
            value={zipcode}
            onChange={(e) => setZipcode(e.currentTarget.value)}
            placeholder="Zipcode"
          />
        </div>
        <div className={styles.item}>
          <Select
            options={radiusOptions}
            value={radiusOption !== undefined ? [radiusOption] : []}
            placeholder="Radius"
            onChange={(e) => setRadiusOption(e.option as Option)}
          />
        </div>
        <div className={styles.item}>
          <Button
            disabled={zipcode.length < 5 || radiusOption === undefined}
            onClick={(e) =>
              onSubmit({
                zipcode: zipcode as string,
                radius: radiusMiles[radiusOption?.id as string],
              })
            }
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
