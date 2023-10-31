import React from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "56px",
  },
  divider: {
    marginBottom: "30px",
  },
  button: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

/** Shows details about a location's review
 * - Recieves review from parent: LocationReviewList
 */
function LocationReviewCard({ review }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">{review.title}</Typography>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">
            Rating: {review.rating}{" "}
            <img alt="rating icon" src={review.rating_image_url} />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} align="right">
          <Typography variant="subtitle2">
            Date: {review.travel_date}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1">{review.text}</Typography>
      <Typography variant="subtitle2">Trip type: {review.trip_type}</Typography>
      <Button
        component={Link}
        color="primary"
        variant="outlined"
        href={review.web_url}
        target="_blank"
        className={classes.button}
        size="small"
      >
        Read more on TripAdvisor
      </Button>
      <Divider className={classes.divider} />
    </div>
  );
}

export default LocationReviewCard;
