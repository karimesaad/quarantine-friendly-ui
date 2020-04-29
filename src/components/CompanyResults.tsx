import React, { FC, useState } from "react";
import { CompanyDistance } from "../api/firebase";
import styles from "./CompanyResults.module.css";
import CompanyDetail from "./CompanyDetail";
import { Input } from "baseui/input";
import { useFilters } from "../hooks";
import LocalMall from "@material-ui/icons/LocalMall";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import { Button } from "baseui/button";
import { StringParam, useQueryParam } from "use-query-params";


interface CompanyResultsProps {
  companyDistances: CompanyDistance[];
  zipcode: string;
  radius: number;
  isLoading: boolean;
}

interface Filters {
  pickup: boolean;
  delivery: boolean;
  openNow: boolean;
}

const CompanyResults: FC<CompanyResultsProps> = (props) => {
  const [companyId, setCompanyId] = useQueryParam("companyId", StringParam);
  const [searchValue, setSearchValue] = useState<string>("");
  const { togglePickup, toggleDelivery, toggleOpenNow } = useFilters({
    pickup: false,
    delivery: false,
    openNow: false,
  });

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="Search ..."
        />
        <Button onClick={(e) => togglePickup()}>
          <LocalMall />
        </Button>
        <Button onClick={(e) => toggleDelivery()}>
          <DirectionsCar />
        </Button>
        <Button onClick={(e) => toggleOpenNow()}>
          <MeetingRoom />
        </Button>
      </div>
      <div>
        {props.companyDistances.map((companyDistance) => (
          <CompanyDetail {...companyDistance} expanded={companyId === companyDistance.company.id} />
        ))}
      </div>
    </div>
  );
};

export default CompanyResults;
