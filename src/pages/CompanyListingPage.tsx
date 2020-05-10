import React, { FC, useState, useEffect } from "react";
import FeatureMap from "../components/FeatureMap";
import Spinner from "../components/Spinner";
import { CompanyDistance } from "../api/firebase";
import * as api from "../api";
import { Coordinates, Filters } from "../types";
import styles from "./CompanyListingPage.module.css";
import CompanyResults from "../components/CompanyResults";
import { StringParam, useQueryParam } from "use-query-params";
import useStateObject from "../hooks/useStateObject";
import { useAsync } from "../hooks";
import { dayOfWeekAsString } from "../utils";

interface CompanyListingPageProps {
  zipcode: string;
  radius: number;
}

export const CompanyListingPage: FC<CompanyListingPageProps> = (props) => {
  const [companyId, setCompanyId] = useQueryParam("companyId", StringParam);
  const [mapLoading, setMapLoading] = useState(true);
  // const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  // const [companyDistances, setCompanyDistances] = useState<CompanyDistance[]>(
  //   []
  // );
  const [filters, setFilters] = useStateObject<Filters>({
    pickup: false,
    delivery: false,
    openNow: false,
    search: "",
  });

  const fetchData = async () => {
    const coordinates = await api.getCoordinatesFromZipCode(props.zipcode);
    const companyDistances = await api.getCompanyDistances(
      coordinates,
      props.radius
    );
    return {
      userCoordinates: coordinates,
      companyDistances,
    };
  };

  const {
    execute,
    data,
    error,
    isPending,
    isFulfilled,
    isRejected,
    isInitial,
  } = useAsync(fetchData);

  useEffect(() => {
    execute();
  }, []);

  const filteredCompaniesList = filterCompanies(
    data?.companyDistances ?? [],
    filters
  );

  const isLoading = isPending || isInitial;

  return (
    <div className={styles.page}>
      <div className={styles.resultsContainer}>
        <CompanyResults
          companyDistances={filteredCompaniesList}
          zipcode={props.zipcode}
          radius={props.radius}
          isLoading={isLoading}
          selected={companyId}
          onSelect={(companyId) => setCompanyId(companyId)}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
      <div className={styles.resultsMap}>
        {(isLoading || mapLoading) && <Spinner />}
        {data?.userCoordinates && (
          <FeatureMap
            className={mapLoading ? styles.hidden : ""}
            center={data.userCoordinates}
            options={filteredCompaniesList.map((cd) => ({
              id: cd.company.id,
              coordinates: cd.company.coordinates,
            }))}
            onSelect={(companyId) => setCompanyId(companyId)}
            selected={companyId}
            onLoad={() => setMapLoading(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyListingPage;

const filterCompanies = (
  companyDistances: CompanyDistance[],
  filters: Filters
) => {
  return companyDistances
    .filter(searchFilter(filters.search))
    .filter(pickupFilter(filters.pickup))
    .filter(deliveryFilter(filters.delivery))
    .filter(openNowFilter(filters.openNow));
};

const searchFilter = (search: string) => (
  companyDistance: CompanyDistance
): boolean => {
  return companyDistance.company.name
    .toLowerCase()
    .includes(search.toLowerCase());
};

const pickupFilter = (enabledPickup: boolean) => (
  companyDistance: CompanyDistance
): boolean => {
  if (!enabledPickup) {
    return true;
  }
  return companyDistance.company.pickup === true;
};

const deliveryFilter = (enabledDelivery: boolean) => (
  companyDistance: CompanyDistance
): boolean => {
  if (!enabledDelivery) {
    return true;
  }
  return companyDistance.company.delivery === true;
};

const openNowFilter = (enabledOpenNow: boolean) => (
  companyDistance: CompanyDistance
): boolean => {
  if (!enabledOpenNow) {
    return true;
  }

  const today = dayOfWeekAsString(new Date().getDay());
  const companyHours = companyDistance.company.hours[today];
  //company does not have hours i.e. it's closed today
  if (companyHours.startTime == null || companyHours.endTime == null) {
    return false;
  }

  const currentTime = getHoursAndMinutes(new Date());
  const companyStartTime = getHoursAndMinutes(companyHours.startTime);
  const companyEndTime = getHoursAndMinutes(companyHours.endTime);

  return (
    currentTime.getTime() >= companyStartTime.getTime() &&
    currentTime.getTime() <= companyEndTime.getTime()
  );
};

const getHoursAndMinutes = (date: Date) => {
  const companyTime = new Date();
  companyTime.setHours(date.getHours());
  companyTime.setMinutes(date.getMinutes());
  return companyTime;
};
