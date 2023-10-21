import React from "react";
import LocationReviewCard from "./LocationReviewCard";

/** Shows a list of all locations
 *
 * - Recieves reviews list from parent: LcoationDetails
 * - Passes review data to children: LocationReviewCard
 */
function LocationReviewList({ reviews }) {
  return (
    <div className="">
      {reviews ? (
        <div>
          <h4>REVIEWS</h4>
          {reviews.map((r) => (
            <LocationReviewCard key={r.id} review={r} />
          ))}
        </div>
      ) : (
        <div>
          <p>No reviews to show.</p>
        </div>
      )}
    </div>
  );
}

export default LocationReviewList;
