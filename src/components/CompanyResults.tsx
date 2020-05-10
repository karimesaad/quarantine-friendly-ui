import React, { FC, useRef, useLayoutEffect } from "react";
import { CompanyDistance } from "../api/firebase";
import Spinner from "../components/Spinner";
import styles from "./CompanyResults.module.css";
import CompanyDetail from "./CompanyDetail";
import { Input } from "baseui/input";
import { Filters } from "../types";
import SelectButton from "./SelectButton";
import NoData from "./NoData";

interface CompanyResultsProps {
  companyDistances: CompanyDistance[];
  zipcode: string;
  radius: number;
  isLoading: boolean;
  selected: string | null | undefined;
  onSelect: (id: string) => void;
  filters: Filters;
  onFilterChange: (partialFilters: Partial<Filters>) => void;
}

const CompanyResults: FC<CompanyResultsProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.filtersContainer}>
        <Input
          value={props.filters.search}
          onChange={(e) =>
            props.onFilterChange({ search: e.currentTarget.value })
          }
          placeholder="Search ..."
        />
        <div className={styles.filters}>
          <div className={styles.filterByLabel}>Filter By:</div>
          <SelectButton
            onClick={(e) =>
              props.onFilterChange({ pickup: !props.filters.pickup })
            }
            selected={props.filters.pickup}
          >
            takeout
          </SelectButton>
          <SelectButton
            onClick={(e) =>
              props.onFilterChange({ delivery: !props.filters.delivery })
            }
            selected={props.filters.delivery}
          >
            delivery
          </SelectButton>
          <SelectButton
            onClick={(e) =>
              props.onFilterChange({ openNow: !props.filters.openNow })
            }
            selected={props.filters.openNow}
          >
            open now
          </SelectButton>
        </div>
      </div>
      <div className={styles.data}>
        {props.isLoading && <Spinner />}
        {!props.isLoading && props.companyDistances.length === 0 && (
          <NoData message="No results" />
        )}
        {props.companyDistances.map((companyDistance) => (
          <ScrollIntoView
            active={props.selected === companyDistance.company.id}
          >
            <CompanyDetail
              {...companyDistance}
              selected={props.selected === companyDistance.company.id}
              onClick={() => props.onSelect(companyDistance.company.id)}
            />
          </ScrollIntoView>
        ))}
      </div>
    </div>
  );
};

const ScrollIntoView: FC<{ active: boolean }> = ({ children, active }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (active) {
      ref.current?.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [active]);

  return <div ref={ref}>{children}</div>;
};

export default CompanyResults;
