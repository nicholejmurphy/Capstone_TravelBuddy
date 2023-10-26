import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../auth/UserContext";
import UserApi from "../api/userApi";

/** Shows a basic details about a location
 *
 * - Recieves details about locations from parent: LocationList
 * - Passes location information to children: LocationCard
 */
function LocationCard({ id, name, address }) {
  const history = useHistory();
  const { currUser } = useContext(UserContext);

  function handleClick() {
    history.push(`/locations/${id}`);
  }

  async function handleSave() {
    UserApi.addSavedLocation(currUser.id, id);
  }

  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardText>{address}</CardText>
        <Button onClick={handleClick}>Details</Button>
      </CardBody>
    </Card>
  );
}

export default LocationCard;
