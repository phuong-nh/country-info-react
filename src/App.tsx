import SearchAppBar from "./components/AppBar";
import CountryTable from "./components/CountryTable";
import { useInitialData } from "./redux/hooks";
import { Routes, Route, useLocation } from "react-router-dom";
import DetailedDialog from "./components/DetailedDialog";

function Homepage() {
  return (
    <>
      <SearchAppBar />
      <CountryTable />
    </>
  );
}

function App() {
  useInitialData();
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="" element={<Homepage />}>
          <Route path="/:countryCode" element={<DetailedDialog />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/:countryCode" element={<DetailedDialog />} />
        </Routes>
      )}
    </>
  );
}

export default App;
