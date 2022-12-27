import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Alert, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBox from "./SearchBox";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { filterByName, sortByName } from "../redux/countries";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSortClick = () => {
    dispatch(sortByName());
    dispatch(filterByName());
  };

  const handleMenuClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Country
            </Typography>
            <SearchBox />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 2 }}
              onClick={handleSortClick}
            >
              <SortByAlphaIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">Nothing's here</Alert>
      </Snackbar>
    </>
  );
}
