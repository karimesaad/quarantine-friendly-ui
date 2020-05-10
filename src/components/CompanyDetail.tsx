import React, { FC, MouseEvent } from "react";
import { Company } from "../api/firebase";
import styles from "./CompanyDetail.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import StoreIcon from "@material-ui/icons/Store";
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import Facebook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import { dayOfWeekAsString, getCompanyHoursForDay, Day } from "../utils";

interface CompanyDetailProps {
  company: Company;
  distance: number;
  selected: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const validateWebsite = (url: string) => {
  if (url.includes("http") || url.includes("www")) {
    return url;
  }
  return "http://" + url;
};

const CompanyDetail: FC<CompanyDetailProps> = (props) => {
  const today = dayOfWeekAsString(new Date().getDay());
  const todayHours = getCompanyHoursForDay(props.company, today);

  return (
    <div
      className={[styles.root, props.selected ? styles.selected : ""].join(" ")}
      onClick={props.onClick}
    >
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.name}>{props.company.name}</div>
          <div className={styles.address}>{props.company.address}</div>
          <div className={styles.distance}>{props.distance} miles away</div>
        </div>
        <div className={styles.right}>
          <div className={styles.icons}>
            <Tooltip title="Takeout">
              <div>
                {props.company.pickup && <StoreIcon fontSize="small" />}
                {!props.company.pickup && (
                  <StoreOutlinedIcon fontSize="small" color="disabled" />
                )}
              </div>
            </Tooltip>
            <Tooltip title="Delivery">
              <div>
                {props.company.delivery && <DirectionsCar fontSize="small" />}
                {!props.company.delivery && (
                  <DirectionsCarOutlinedIcon
                    fontSize="small"
                    color="disabled"
                  />
                )}
              </div>
            </Tooltip>
          </div>
          <div className={styles.today}>
            <div>{todayHours ? "" : "Closed today"}</div>
            <div>{todayHours}</div>
          </div>
        </div>
      </div>
      {props.selected && (
        <div className={styles.details}>
          <div className={styles.social}>
            <div className={styles.website}>
              <a href={validateWebsite(props.company.website)}>Visit website</a>
            </div>
            <div>
              <a
                className={styles.socialBtn}
                href={props.company.socialMedia.facebook}
              >
                <Facebook />
              </a>
              <a
                className={styles.socialBtn}
                href={props.company.socialMedia.instagram}
              >
                <Instagram />
              </a>
            </div>
          </div>
          <div className={styles.hours}>
            <div className={styles.days}>
              <div className={styles.bold}>M</div>
              <div className={styles.bold}>T</div>
              <div className={styles.bold}>W</div>
              <div className={styles.bold}>T</div>
              <div className={styles.bold}>F</div>
              <div className={styles.bold}>S</div>
              <div className={styles.bold}>S</div>
            </div>
            <div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Monday) ?? "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Tuesday) ?? "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Wednesday) ??
                  "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Thursday) ?? "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Friday) ?? "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Saturday) ?? "Closed"}
              </div>
              <div>
                {getCompanyHoursForDay(props.company, Day.Sunday) ?? "Closed"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
