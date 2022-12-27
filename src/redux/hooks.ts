import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DetailedCountryV3 from "../interfaces/DetailedCountryV3";
import { fetchData } from "./countries";
import { AppDispatch } from "./store";

const apiLink = "https://restcountries.com/v2";

export const useInitialData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchData(
        apiLink +
          "/all?fields=name,flag,region,population,languages,alpha3Code"
      )
    );
  }, []);
};

export const useDetailedData = (alpha3Code: string) => {
  const [detail, setDetail] = useState<DetailedCountryV3[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch("https://restcountries.com/v3.1/alpha/" + alpha3Code)
      ).json();
      setDetail(data);
      console.log(data)
    }
    fetchData();
  }, []);

  return detail;
};
