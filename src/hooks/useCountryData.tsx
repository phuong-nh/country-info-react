import { useState, useEffect } from 'react';
import Country from '../interfaces/Country';

function useCountryData(endpoint = 'https://restcountries.com/v2/all'): [Country[], any] {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await (await fetch(endpoint)).json() as Country[];
      setCountries(data);
    }
    fetchData();
  }, []);

  return [countries, setCountries];
}

export default useCountryData;