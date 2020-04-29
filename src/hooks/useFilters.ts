import React, { useState } from "react";

interface Filters {
  pickup: boolean;
  delivery: boolean;
  openNow: boolean;
}

const useFilters = (defaultValue: Filters) => {
  const [filters, setFilters] = useState<Filters>(defaultValue);

  const togglePickup = () => {
    setFilters((prev: Filters) => ({
      ...prev,
      pickup: !prev.pickup,
    }));
  };
  const toggleDelivery = () => {
    setFilters((prev: Filters) => ({
      ...prev,
      delivery: !prev.delivery,
    }));
  };
  const toggleOpenNow = () => {
      setFilters((prev: Filters) => ({
    ...prev,
    pickup: !prev.openNow,
  }))};

  return {
    togglePickup,
    toggleDelivery,
    toggleOpenNow,
  };
};

export default useFilters;
