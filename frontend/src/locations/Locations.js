import React, { useState, useEffect } from "react";

import LocationSearchForm from "./LocationSearch";
import LocationList from "./LocationList";
import TravelApi from "../api/travelApi";
import Loading from "../common/Loading";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { CardMedia, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreIcon from "@material-ui/icons/More";
import Tooltip from "@material-ui/core/Tooltip";

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
  card: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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

  if (dataIsLoading) return <Loading />;

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item className={classes.title}>
        {searchTerm ? (
          <Typography variant="h4">Things to do in {searchTerm}</Typography>
        ) : (
          <Typography variant="h4" align="center">
            Search for a location to get started. <br />
            Happy Trails!
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
            <Card className={classes.card} elevation={3}>
              <CardHeader
                title="Some place REALLY cool..."
                subheader="Hoseshoe Bend, AZ"
              />
              <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="Horseshoe Bend, AZ"
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                  Wow. Check out this cool spot! This could be you... and we
                  want to help you get there!
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip title="You can add locations to your favorties list and save them for later!">
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="To get more details on a location">
                  <IconButton aria-label="share">
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Locations;
