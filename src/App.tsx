import React from "react";
import SearchAppBar from "./components/AppBar";
import CountryTable from "./components/CountryTable";
import CountryList from "./components/CountryList";
import { useInitialData } from "./redux/hooks";

function App() {
  useInitialData();

  return (
    <>
      <SearchAppBar />
      <CountryTable />
    </>
  );
}

export default App;
