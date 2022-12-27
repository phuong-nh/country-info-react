import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  BottomNavigation,
} from "@mui/material";
import { useSelector } from "react-redux";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Country from "../interfaces/Country";
import { useState } from "react";

export default function CountryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const countries = useSelector((state: any) => state.countries);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ pb: 7 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.display
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country: Country) => (
                <TableRow
                  key={country.alpha3Code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img
                      src={country.flag}
                      alt={`Flag of ${country.name}`}
                      style={{ width: 120 }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {country.name}
                  </TableCell>
                  <TableCell>{country.region}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("en-US").format(country.population)}
                  </TableCell>
                  <TableCell>
                    <ul>
                      {country.languages.map((language) => (
                        <li key={language.name}>{language.name}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="More Info">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={countries.display.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
