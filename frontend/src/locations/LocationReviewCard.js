import React from "react";

// /** Shows a list of all locations
//  *
//  * - Saves locations as state
//  *   usesrs to filter location list by name
//  */
function LocationReviewCard({ review }) {
  return (
    <div className="">
      <div>
        <p>{review.title}</p>
        <p>Date: {review.travel_date}</p>
        <p>
          Rating: {review.rating}{" "}
          <img alt="rating icon" src={review.rating_image_url} />
        </p>
        <p>Trip type: {review.trip_type}</p>

        <p>{review.text}</p>
        <small>
          <a href={review.url}>Read More on TripAdvisor</a>
        </small>
      </div>
    </div>
  );
}

export default LocationReviewCard;
