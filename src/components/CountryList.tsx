import React, { useState, useEffect } from 'react';

interface Country {
  name: string;
  region: string;
  capital: string;
  population: number;
  alpha3Code: any;
}

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await (await fetch('https://restcountries.com/v2/all')).json() as Country[];
      setCountries(data);
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Region</th>
          <th>Capital</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(country => (
          <tr key={country.alpha3Code}>
            <td>{country.name}</td>
            <td>{country.region}</td>
            <td>{country.capital}</td>
            <td>{country.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryList;
