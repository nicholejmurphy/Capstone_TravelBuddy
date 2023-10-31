import React from "react";
import LocationReviewCard from "./LocationReviewCard";
import { Typography } from "@material-ui/core";

/** Shows a list of all locations
 *
 * - Recieves reviews list from parent: LcoationDetails
 * - Passes review data to children: LocationReviewCard
 */
function LocationReviewList({ reviews }) {
  return (
    <div>
      <h4>REVIEWS</h4>
      {reviews.length ? (
        <div>
          {reviews.map((r) => (
            <LocationReviewCard key={r.id} review={r} />
          ))}
        </div>
      ) : (
        <div>
          <Typography>
            Hmm... looks like no one has reviewed this location yet.
          </Typography>
        </div>
      )}
    </div>
  );
}

export default LocationReviewList;
