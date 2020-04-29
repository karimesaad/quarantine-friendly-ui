import React, { FC, useState, useEffect } from "react";
import FeatureMap from "../components/FeatureMap";
import { CompanyDistance } from "../api/firebase";
import * as api from "../api";
import { Coordinates } from "../types";
import styles from "./CompanyListingPage.module.css";
import CompanyResults from "../components/CompanyResults";
import { StringParam, useQueryParam } from "use-query-params";

interface CompanyListingPageProps {
  zipcode: string;
  radius: number;
}

export const CompanyListingPage: FC<CompanyListingPageProps> = (props) => {
  const [companyId, setCompanyId] = useQueryParam("companyId", StringParam);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [companyDistances, setCompanyDistances] = useState<CompanyDistance[]>(
    []
  );

  const fetchData = async () => {
    const coordinates = await api.getCoordinatesFromZipCode(props.zipcode);
    const companyDistances = await api.getCompanyDistances(
      coordinates,
      props.radius
    );
    setUserCoordinates(coordinates);
    setCompanyDistances(companyDistances);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.resultsContainer}>
        <CompanyResults companyDistances={companyDistances} zipcode={props.zipcode} radius={props.radius} isLoading={false}/>
      </div>
      <div className={styles.resultsMap}>
        {userCoordinates && (
          <FeatureMap
            center={userCoordinates}
            options={companyDistances.map((cd) => ({
              id: cd.company.id,
              coordinates: cd.company.coordinates,
            }))}
            onSelect={(companyId) => setCompanyId(companyId)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyListingPage;
