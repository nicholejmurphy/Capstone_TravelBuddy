import React, { useState, useEffect } from "react";

import LocationSearchForm from "./LocationSearch";
import LocationList from "./LocationList";
import TravelApi from "../api/travelApi";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { CardMedia, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "30px",
    marginBottom: "30px",
    fontWeight: 200,
    color: "#ffffff",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
  selection: {
    margin: "10px",
    backgroundColor: "#ffffff",
  },
  body: {
    paddingTop: "10px",
    flexGrow: 1,
  },
  locations: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    marginTop: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  skeletonBox: {
    width: "100%",
    height: 250,
    margin: "10px",
  },
  skeletonMedia: {
    height: 150,
  },
}));

/** Main container to render Location components
 *
 * - Saves locations as state
 * - Passes 'setSearchTerm' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 * - Toggles search category with category buttons which triggers
 *   new search filtered by category.
 * - Passes 'locations' to LocationList
 */
function Locations() {
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [category, setCategory] = useState("geos");
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();

  useEffect(
    function loadLocations() {
      async function getLocations() {
        if (searchTerm) {
          setDataIsLoading(true);
          try {
            const res = await TravelApi.searchLocation(searchTerm, category);
            setLocations(res);
          } catch (error) {
            console.error(
              "Failed to get locations based on search term and category: ",
              searchTerm,
              category,
              ".",
              error
            );
            setLocations(null);
          }
          setDataIsLoading(false);
        }
      }
      getLocations();
    },
    [searchTerm, category]
  );

  const handleChange = (event, newCategory) => {
    if (!newCategory) return;
    setCategory(newCategory);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item className={classes.title}>
        {searchTerm ? (
          <Typography variant="h4">Things to do in {searchTerm}</Typography>
        ) : (
          <Typography variant="h4" align="center">
            Let's get started.
          </Typography>
        )}
      </Grid>
      <Grid item className={classes.search}>
        <LocationSearchForm
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </Grid>
      <Grid item>
        {locations && (
          <Typography variant="subtitle2">
            Filters:
            <ToggleButtonGroup
              size="small"
              value={category}
              exclusive
              onChange={handleChange}
              className={classes.selection}
            >
              <ToggleButton value="geos">Geos</ToggleButton>
              <ToggleButton value="hotels">Hotels</ToggleButton>
              <ToggleButton value="restaurants">Restaurants</ToggleButton>
              <ToggleButton value="attractions">Attractions</ToggleButton>
            </ToggleButtonGroup>
          </Typography>
        )}
      </Grid>
      <Grid item container>
        <Paper className={classes.locations} elevation={3}>
          {dataIsLoading &&
            Array.from(new Array(3)).map((index) => (
              <Box key={index} className={classes.skeletonBox}>
                <Skeleton
                  key={index}
                  variant="rect"
                  className={classes.skeletonMedia}
                />
                <Box pt={0.5} key={index}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))}
          {locations ? (
            <Grid
              item
              container
              className={classes.body}
              justifyContent="center"
              spacing={3}
            >
              <LocationList locations={locations} />
            </Grid>
          ) : (
            <>
              <Card elevation={5}>
                <CardMedia
                  component="img"
                  alt="hoseshoe bend, az"
                  height="140"
                  image="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  title="Some place really cool!"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Horseshoe Bend, AZ
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="p"
                  >
                    Wow. Check out this cool spot! This could be you... and we
                    want to help you get there!
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Start your adventure by using the search bar above!
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Happy Trails!{" "}
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Locations;
