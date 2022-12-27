import { useSelector } from 'react-redux';
import Country from '../interfaces/Country';
import { useInitialData } from '../redux/hooks';

function CountryList() {
  const countries = useSelector((state: any) => (state.countries))
  useInitialData();
  
  return (
    <table>
      <thead>
        <tr>
          <th style={{border: "1px solid black"}}>Flag</th>
          <th style={{border: "1px solid black"}}>Name</th>
          <th style={{border: "1px solid black"}}>Region</th>
          <th style={{border: "1px solid black"}}>Capital</th>
          <th style={{border: "1px solid black"}}>Population</th>
          <th style={{border: "1px solid black"}}>Language(s)</th>
        </tr>
      </thead>
      <tbody>
        {countries.display.map((country: Country) => (
          <tr key={country.alpha3Code}>
            <td style={{border: "1px solid black"}}><img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: 100}}/></td>
            <td style={{border: "1px solid black"}}>{country.name}</td>
            <td style={{border: "1px solid black"}}>{country.region}</td>
            <td style={{border: "1px solid black"}}>{country.capital}</td>
            <td style={{border: "1px solid black"}}>{country.population}</td>
            <td style={{border: "1px solid black"}}>
            <ul>
              {country.languages.map(language => (
                <li>{language.name}</li>
              ))}
            </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
  
export default CountryList;
