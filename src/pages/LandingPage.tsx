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
  { label: "1 Mile", id: "0" },
  { label: "5 Miles", id: "1" },
  { label: "10 Miles", id: "2" },
  { label: "15 Miles", id: "3" },
  { label: "20 Miles", id: "4" },
];

const radiusMiles: Record<string, number> = {
  "0": 1,
  "1": 5,
  "2": 10,
  "3": 15,
  "4": 20,
};

const LandingPage: FC<LandingPageProps> = ({ onSubmit }) => {
  const [zipcode, setZipcode] = useState<string>("");
  const [radiusOption, setRadiusOption] = useState<Option>();

  return (
    <div className={styles.root}>
      {/* <div className={styles.videoContainer}>
        <video width="1800" autoPlay muted loop className={styles.coffeeVideo}>
          <source src="coffee_video.mp4" type="video/mp4" />
        </video>
      </div> */}
      <div className={styles.content}>
        <div className={styles.title}>
          Quarantine Friendly
          <div className={styles.city}> twin cities </div>
        </div>

        <div className={styles.description}>
          Welcome! Find a new favorite latte while supporting local coffeeshops
          in the twin cities.
        </div>
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
              clearable={false}
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
          {/* <div className={styles.contactUs}>
            Can't find your favorite coffeeshop? <br />
            <a
              className={styles.mailTo}
              href="mailto:quarantinefriendly@gmail.com"
            >
              Let us know here!
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
