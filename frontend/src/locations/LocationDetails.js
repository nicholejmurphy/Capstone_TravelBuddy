import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import UserContext from "../auth/UserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TravelApi from "../api/travelApi";
import LocationPhotos from "./LocationPhotos";
import Loading from "../common/Loading";
import LocationReviewList from "./LocationReviewList";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "56px",
  },
  title: {
    marginTop: "30px",
    marginBottom: "30px",
    fontWeight: 200,
    color: "#ffffff",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    marginTop: "10px",
    marginBottom: "20px",
  },
}));

/** Shows location details
 *
 * - Gets location id from url params
 * - Retrieves location details, reviews, and photos from API
 * - Passes reviews and photos to children
 */
function LocationDetails() {
  const { saveLocation, hasSaved, removeLocation } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [photos, setPhotos] = useState(null);

  const { locationId } = useParams();
  const classes = useStyles();

  useEffect(
    function loadLocation() {
      async function getLocation() {
        setDataIsLoading(true);
        try {
          const detailsRes = await TravelApi.getLocationDetails(locationId);
          const photosRes = await TravelApi.getLocationPhotos(locationId);
          const reviewsRes = await TravelApi.getLocationReviews(locationId);
          setLocation(detailsRes.name ? detailsRes : null);
          setPhotos(photosRes);
          setReviews(reviewsRes);
          // Check if user has saved the location
          setSaved(hasSaved(locationId));
        } catch (error) {
          console.error("Failed to get location: ", locationId, error);
          setLocation(null);
        }
        setDataIsLoading(false);
      }
      getLocation();
    },
    [locationId, hasSaved]
  );

  async function handleSave(e) {
    if (e.target.innerHTML === "Save") {
      // Handle saving location
      saveLocation(locationId);
      setSaved(true);
    } else {
      // Handle removing location
      removeLocation(locationId);
      setSaved(false);
    }
  }

  if (dataIsLoading) return <Loading />;

  return (
    <Grid container className={classes.root}>
      {location ? (
        <div>
          <LocationPhotos photos={photos} />
          <Typography variant="h4" align="center" className={classes.title}>
            {location.name}
          </Typography>
          <Paper className={classes.body}>
            <Typography variant="subtitle1">
              {location.address_obj.address_string}
            </Typography>
            <Typography variant="body1">{location.description}</Typography>
            <Typography variant="caption">
              <img alt="rating icon" src={location.rating_image_url}></img>
              {location.rating} ({location.num_reviews} reviews)
            </Typography>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="write a reviw or read more on TripAdvisor"
            >
              {/* <Button component={a} to={location.write_review}>
                Write a Review
              </Button>
              <Button component={a} to={location.web_url}>
                Read more on TripAdvisor
              </Button> */}
            </ButtonGroup>
            {/* <Typography variant="subtitle1">
              <a href={location.write_review}>Write a review</a>
              <a href={location.web_url}>Read more on TripAdvisor</a>
            </Typography> */}
            <Button onClick={handleSave}>{saved ? "Saved" : "Save"}</Button>
          </Paper>
          <Paper className={classes.body}>
            <LocationReviewList reviews={reviews} />
          </Paper>
        </div>
      ) : (
        <p>
          Sorry, we are having trouble finding the location you are looking for.
        </p>
      )}
    </Grid>
  );
}

export default LocationDetails;
