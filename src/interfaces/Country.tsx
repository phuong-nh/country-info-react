export default interface Country {
  name: string;
  flag: string;
  region: string;
  capital: string;
  population: number;
  languages: {
    name: string;
  }[];
  alpha3Code: string;
}