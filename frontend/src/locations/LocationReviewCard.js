import React from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  title: {
    marginTop: "20px",
    marginBottom: "5px",
  },
  description: {
    marginTop: "10px",
  },
  rating: {
    marginBottom: "10px",
  },
  ratingText: {
    backgroundColor: "rgba(104, 58, 183,0.1)",
    borderRadius: "8px",
    padding: "8px",
  },
}));

/** Shows details about a location's review
 * - Recieves review from parent: LocationReviewList
 * - Has access links to trip advisor for more details
 */
function LocationReviewCard({ review }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {review.title}
      </Typography>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12} align="left" className={classes.rating}>
          <Typography variant="caption" className={classes.ratingText}>
            Rating: {review.rating}
            <img
              alt="rating icon"
              src={review.rating_image_url}
              style={{ width: "85px" }}
            />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">
            Date: {review.travel_date}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={6} align="right">
          <Typography variant="subtitle2">
            Trip type: {review.trip_type}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.description}>
        {review.text}
      </Typography>
      <Button
        component={Link}
        color="primary"
        href={review.url}
        target="_blank"
        className={classes.button}
        size="small"
      >
        Read more
      </Button>
      <Divider className={classes.divider} />
    </div>
  );
}

export default LocationReviewCard;
