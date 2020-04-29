import React, { FC, useState } from "react";
import { Select, Option } from "baseui/select";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import * as api from "../api";
import styles from "./AddCompanyPage.module.css";

const AddCompanyPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [pickup, setPickup] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");

  const handleSubmit = () => {
    api.addCompany({
      name: name,
      address: address,
      zipcode: zipcode,
      city: "Minneapolis",
      state: "MN",
      phoneNumber: phoneNumber,
      website: website,
      pickup: pickup,
      delivery: delivery,
      socialMedia: {
        facebook: facebook,
        instagram: instagram,
      },
      latitude: latitude * 1,
      longitude: longitude * 1,
    });
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.fields}>
          <Input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Name"
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="address"
          />
          <Input
            value={zipcode}
            onChange={(e) => setZipcode(e.currentTarget.value)}
            placeholder="Zipcode"
          />
          <Input
            value={latitude}
            onChange={(e) => setLatitude(Number(e.currentTarget.value))}
            placeholder="latitude"
          />
          <Checkbox
            checked={pickup}
            onChange={() => setPickup(!pickup)}
            labelPlacement={LABEL_PLACEMENT.right}
          >
            Pickup
          </Checkbox>
          <Checkbox
            checked={delivery}
            onChange={() => setDelivery(!delivery)}
            labelPlacement={LABEL_PLACEMENT.right}
          >
            Delivery
          </Checkbox>
        </div>
        <div className={styles.fields}>
          <Input
            value={longitude}
            onChange={(e) => setLongitude(Number(e.currentTarget.value))}
            placeholder="longitude"
          />
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            placeholder="phoneNumber"
          />
          <Input
            value={website}
            onChange={(e) => setWebsite(e.currentTarget.value)}
            placeholder="website"
          />
          <Input
            value={facebook}
            onChange={(e) => setFacebook(e.currentTarget.value)}
            placeholder="facebook"
          />
          <Input
            value={instagram}
            onChange={(e) => setInstagram(e.currentTarget.value)}
            placeholder="instagram"
          />
        </div>
      </div>
      <div style={{ padding: "12px" }}>
        <Button onClick={(e) => handleSubmit()}>
          <span>---></span>
        </Button>
      </div>
    </div>
  );
};

export default AddCompanyPage;
