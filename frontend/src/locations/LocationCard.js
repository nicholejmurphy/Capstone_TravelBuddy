import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Skeleton from "@material-ui/lab/Skeleton";

import UserContext from "../auth/UserContext";
import TravelApi from "../api/travelApi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "450px",
    },
  },
}));

/** Shows a basic details about a location
 *
 * - Recieves details about locations from parent: LocationList
 * - Passes location information to children: LocationCard
 */
function LocationCard({ id, name, address }) {
  const { saveLocation, hasSaved, removeLocation } = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState();
  const [saved, setSaved] = useState();
  const history = useHistory();
  const classes = useStyles();

  const DEFAUL_IMG =
    "https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?auto=format&fit=crop&q=80&w=3296&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Check if user has saved the location
  useEffect(
    function loadLocationData() {
      async function getLocationData() {
        const res = await TravelApi.getLocationPhotos(id);
        setPhotoUrl(res[0] ? res[0].images.large.url : null);
        setSaved(hasSaved(id));
      }
      getLocationData();
    },
    [id, hasSaved]
  );

  async function handleSave(e) {
    if (!hasSaved(id)) {
      // Handle saving location
      saveLocation(id);
      setSaved(true);
    } else {
      // Handle removing location
      removeLocation(id);
      setSaved(false);
    }
  }
  function handleClick() {
    history.push(`/locations/${id}`);
  }

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea>
        {photoUrl ? (
          <CardMedia
            component="img"
            alt={`image of ${name}`}
            height="140"
            image={photoUrl ? photoUrl : DEFAUL_IMG}
            title="Contemplative Reptile"
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="rect"
            height={140}
            className={classes.media}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Save for later">
          <IconButton aria-label="add to favorites" onClick={handleSave}>
            <FavoriteIcon color={saved ? "secondary" : "inherit"} />
          </IconButton>
        </Tooltip>
        <Button size="small" color="primary" onClick={handleClick}>
          More Deatils
        </Button>
      </CardActions>
    </Card>
  );
}

export default LocationCard;
