import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDetailedData } from "../redux/hooks";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { countryCode } = useParams();
  const data = useDetailedData(countryCode as string);
  const country = data ? data[0] : undefined;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {country && (
          <DialogContent sx={{ padding: 0 }}>
            <Card sx={{ maxWidth: 700 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="Avatar">
                    {country.name.common[0]}
                  </Avatar>
                }
                title={country.name.common.toLocaleUpperCase()}
                subheader={country.capital[0]}
              />
              <CardMedia
                component="svg"
                image={country.flags.svg}
                height="12rem"
                width="100%"
              />
              <CardContent sx={{ mr: "2.4rem" }}>
                <Typography variant="body1" color={"black"}>
                  <ul>
                    <li>
                      Official name:{" "}
                      <Typography component="strong" color={"blue"}>
                        <b>{country.name.official}</b>
                      </Typography>
                    </li>
                    <li>
                      Region:{" "}
                      <Typography component="strong" color={"blue"}>
                        <b>{`${country.subregion} (${country.region})`}</b>
                      </Typography>
                    </li>
                    <li>
                      Location:{" "}
                      <Typography component="strong" color={"blue"}>
                        <b color={"blue"}>{`${
                          Math.round(country.latlng[0] * 100) / 100
                        }`}</b>
                      </Typography>
                      °N
                      <Typography component="strong" color={"blue"}>
                        <b color={"blue"}>{` ${
                          Math.round(country.latlng[1] * 100) / 100
                        }`}</b>
                      </Typography>
                      °W
                    </li>
                    <li>
                      Population:{" "}
                      <Typography component="strong" color={"blue"}>
                        <b>
                          {new Intl.NumberFormat("en-US").format(
                            country.population
                          )}
                        </b>
                      </Typography>
                    </li>
                  </ul>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="return" onClick={handleClose}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  aria-label="open map"
                  onClick={() => {
                    window.open(country.maps.googleMaps, "_blank");
                  }}
                >
                  <LocationOnIcon />
                </IconButton>
              </CardActions>
            </Card>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
