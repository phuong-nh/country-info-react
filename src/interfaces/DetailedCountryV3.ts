export default interface DetailedCountryV3 {
  name: {
    common: string;
    official: string;
  };
  region: string;
  subregion: string;
  latlng: number[];
  population: number;
  maps: {
    googleMaps: string;
    openStreetMap: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  capital: string[];
}
