import React, { useState, useEffect, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
import TravelApi from "../api/travelApi";
import LocationPhotos from "./LocationPhotos";
import Loading from "../common/Loading";
import LocationReviewList from "./LocationReviewList";

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
    <div className="">
      {location ? (
        <div>
          <LocationPhotos photos={photos} />
          <div>
            <h1>{location.name}</h1>
            <p>{location.description}</p>
            <Button onClick={handleSave}>{saved ? "Saved" : "Save"}</Button>
            <p>
              <img alt="rating icon" src={location.rating_image_url}></img>
              {location.rating} ({location.num_reviews} reviews)
            </p>
            <a href={location.write_review}>Write a review</a>
            <p>
              <a href={location.web_url}>Learn more on TripAdvisor</a>
            </p>
            <p>{location.address_obj.address_string}</p>
          </div>
          <LocationReviewList reviews={reviews} />
        </div>
      ) : (
        <p>
          Sorry, we are having trouble finding the location you are looking for.
        </p>
      )}
    </div>
  );
}

export default LocationDetails;
