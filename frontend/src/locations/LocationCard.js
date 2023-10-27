import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../auth/UserContext";
import TravelApi from "../api/travelApi";

/** Shows a basic details about a location
 *
 * - Recieves details about locations from parent: LocationList
 * - Passes location information to children: LocationCard
 */
function LocationCard({ id, name, address }) {
  const [saved, setSaved] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const history = useHistory();
  const { saveLocation, hasSaved, removeLocation } = useContext(UserContext);
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
    if (e.target.innerHTML === "Save") {
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
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src={photoUrl ? photoUrl : DEFAUL_IMG} />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardText>{address}</CardText>
        <Button onClick={handleClick}>Details</Button>
        <Button onClick={handleSave}>{saved ? "Saved" : "Save"}</Button>
      </CardBody>
    </Card>
  );
}

export default LocationCard;
