import React, { FC, useState } from "react";
import { Select, Option } from "baseui/select";
import { TimePicker } from "baseui/timepicker";
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
  const [mondayStartTime, setMondayStartTime] = React.useState<Date | null>(
    null
  );
  const [mondayEndTime, setMondayEndTime] = React.useState<Date | null>(null);
  const [tuesdayStartTime, setTuesdayStartTime] = React.useState<Date | null>(
    null
  );
  const [tuesdayEndTime, setTuesdayEndTime] = React.useState<Date | null>(null);
  const [
    wednesdayStartTime,
    setWednesdayStartTime,
  ] = React.useState<Date | null>(null);
  const [wednesdayEndTime, setWednesdayEndTime] = React.useState<Date | null>(
    null
  );
  const [thursdayStartTime, setThursdayStartTime] = React.useState<Date | null>(
    null
  );
  const [thursdayEndTime, setThursdayEndTime] = React.useState<Date | null>(
    null
  );
  const [fridayStartTime, setFridayStartTime] = React.useState<Date | null>(
    null
  );
  const [fridayEndTime, setFridayEndTime] = React.useState<Date | null>(null);
  const [saturdayStartTime, setSaturdayStartTime] = React.useState<Date | null>(
    null
  );
  const [saturdayEndTime, setSaturdayEndTime] = React.useState<Date | null>(
    null
  );
  const [sundayStartTime, setSundayStartTime] = React.useState<Date | null>(
    null
  );
  const [sundayEndTime, setSundayEndTime] = React.useState<Date | null>(null);

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
      hours: {
        monday: {
          startTime: mondayStartTime,
          endTime: mondayEndTime,
        },
        tuesday: {
          startTime: tuesdayStartTime,
          endTime: tuesdayEndTime,
        },
        wednesday: {
          startTime: wednesdayStartTime,
          endTime: wednesdayEndTime,
        },
        thursday: {
          startTime: thursdayStartTime,
          endTime: thursdayEndTime,
        },
        friday: {
          startTime: fridayStartTime,
          endTime: fridayEndTime,
        },
        saturday: {
          startTime: saturdayStartTime,
          endTime: saturdayEndTime,
        },
        sunday: {
          startTime: sundayStartTime,
          endTime: sundayEndTime,
        },
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
          Latitude
          <Input
            value={longitude}
            onChange={(e) => setLongitude(Number(e.currentTarget.value))}
            placeholder="longitude"
          />
          Longitude
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
          <TimePicker
            value={mondayStartTime}
            onChange={(date) => setMondayStartTime(date)}
            nullable
          />
          Monday start time
          <TimePicker
            value={mondayEndTime}
            onChange={(date) => setMondayEndTime(date)}
            nullable
          />
          Monday end time
          <TimePicker
            value={tuesdayStartTime}
            onChange={(date) => setTuesdayStartTime(date)}
            nullable
          />
          Tuesday start time
          <TimePicker
            value={tuesdayEndTime}
            onChange={(date) => setTuesdayEndTime(date)}
            nullable
          />
          Tuesday end time
          <TimePicker
            value={wednesdayStartTime}
            onChange={(date) => setWednesdayStartTime(date)}
            nullable
          />
          Wednesday start time
          <TimePicker
            value={wednesdayEndTime}
            onChange={(date) => setWednesdayEndTime(date)}
            nullable
          />
          Wednesday end time
          <TimePicker
            value={thursdayStartTime}
            onChange={(date) => setThursdayStartTime(date)}
            nullable
          />
          Thursday start time
          <TimePicker
            value={thursdayEndTime}
            onChange={(date) => setThursdayEndTime(date)}
            nullable
          />
          Thursday end time
          <TimePicker
            value={fridayStartTime}
            onChange={(date) => setFridayStartTime(date)}
            nullable
          />
          Friday start time
          <TimePicker
            value={fridayEndTime}
            onChange={(date) => setFridayEndTime(date)}
            nullable
          />
          Friday end time
          <TimePicker
            value={saturdayStartTime}
            onChange={(date) => setSaturdayStartTime(date)}
            nullable
          />
          Saturday start time
          <TimePicker
            value={saturdayEndTime}
            onChange={(date) => setSaturdayEndTime(date)}
            nullable
          />
          Saturday end time
          <TimePicker
            value={sundayStartTime}
            onChange={(date) => setSundayStartTime(date)}
            nullable
          />
          Sunday start time
          <TimePicker
            value={sundayEndTime}
            onChange={(date) => setSundayEndTime(date)}
            nullable
          />
          Sunday end time
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
