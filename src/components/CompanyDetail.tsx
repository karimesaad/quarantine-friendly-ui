import React, { FC, MouseEvent } from "react";
import { Company } from "../api/firebase";
import styles from "./CompanyDetail.module.css";
import LocalMall from "@material-ui/icons/LocalMall";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import { dayOfWeekAsString, getCompanyHoursForDay } from "../utils";

interface CompanyDetailProps {
  company: Company;
  distance: number;
  selected: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const CompanyDetail: FC<CompanyDetailProps> = (props) => {
  const today = dayOfWeekAsString(new Date().getDay());
  const todayHours = getCompanyHoursForDay(props.company, today);

  return (
    <div
      className={[styles.root, props.selected ? styles.selected : ""].join(" ")}
      onClick={props.onClick}
    >
      <div className={styles.left}>
        <div className={styles.name}>{props.company.name}</div>
        <div className={styles.address}>{props.company.address}</div>
        <div className={styles.distance}>{props.distance} miles away</div>
      </div>
      <div className={styles.right}>
        <div className={styles.icons}>
          {props.company.pickup && <LocalMall />}
          {props.company.delivery && <DirectionsCar />}
        </div>
        <div className={styles.today}>
          <div>{todayHours ? "" : "Closed today"}</div>
          <div>{todayHours}</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
