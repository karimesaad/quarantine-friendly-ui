import React, { FC } from "react";
import { Company } from "../api/firebase";
import styles from "./CompanyDetail.module.css";
import LocalMall from "@material-ui/icons/LocalMall";
import DirectionsCar from "@material-ui/icons/DirectionsCar";

interface CompanyDetailProps {
  company: Company;
  distance: number;
  expanded: boolean;
}

const CompanyDetail: FC<CompanyDetailProps> = (props) => {
  return (
    <div className={styles.root}>
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
        <div className={styles.today}>Today: 8AM to 5PM</div>
      </div>
    </div>
  );
};

export default CompanyDetail;
