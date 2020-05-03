export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Filters {
  pickup: boolean;
  delivery: boolean;
  openNow: boolean;
  search: string;
}
