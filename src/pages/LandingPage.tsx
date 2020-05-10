import React, { FC, useState } from "react";
import { Select, Option } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import styles from "./LandingPage.module.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import WordSlides from "../components/WordSlides";
import { relative } from "path";

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

const words = [
  "latte",
  "machiatto",
  "cold brew",
  "espresso",
  "americano",
  "miel",
  "oat milk latte",
  "mocha",
  "iced coffee",
  "cortado",
];

const LandingPage: FC<LandingPageProps> = ({ onSubmit }) => {
  const [zipcode, setZipcode] = useState<string>("");
  const [radiusOption, setRadiusOption] = useState<Option>();
  const [showAbout, toggleAbout] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>
          Quarantine Friendly
          <div className={styles.city}> twin cities </div>
        </div>
        <div className={styles.description}>
          Find a new favorite
          <WordSlides
            words={words}
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              padding: 2,
              margin: "0 auto",
              display: "block",
              position: "relative",
            }}
          />
          while supporting local coffee shops
          <br />
          <a
            className={styles.aboutLink}
            onClick={() => toggleAbout(!showAbout)}
          >
            Read {showAbout ? "less..." : "more..."}
          </a>
        </div>
        {!showAbout && (
          <div className={styles.itemContainer}>
            <div className={styles.input}>
              <Input
                value={zipcode}
                onChange={(e) => setZipcode(e.currentTarget.value)}
                placeholder="Zipcode"
              />
            </div>
            <div className={styles.input}>
              <Select
                options={radiusOptions}
                value={radiusOption !== undefined ? [radiusOption] : []}
                placeholder="Radius"
                onChange={(e) => setRadiusOption(e.option as Option)}
                clearable={false}
              />
            </div>
            <div className={styles.button}>
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
        )}
        {showAbout && (
          <div className={styles.about}>
            Quarantine Friendly is a profit-free project designed to help
            connect local coffee shops and community members. We hope this
            website will inspire others to try new coffee shops in their area
            which is especially important during these hard times.
            <br /> This is our way of giving back to the community. <br />
            <br />
            Let us know
            <a
              className={styles.mailTo}
              href="mailto:quarantinefriendly@gmail.com"
            >
              &nbsp;here&nbsp;
            </a>
            if we missed any coffee shops
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
