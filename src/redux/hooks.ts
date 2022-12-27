import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./countries";
import { AppDispatch } from "./store";

const apiLink = "https://restcountries.com/v2";

export const useInitialData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchData(
        apiLink +
          "/all?fields=name,flag,region,capital,population,languages,alpha3Code"
      )
    );
  }, []);
};

export const useDetailedData = (alpha3Code: string) => {
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch("https://restcountries.com/v2/all")
      ).json();
      setDetail(data);
    }
    fetchData();
  }, []);

  return detail;
};
