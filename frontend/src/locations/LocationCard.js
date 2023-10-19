import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'search()' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function LocationCard({ id, name, address }) {
  const history = useHistory();

  function handleClick() {
    history.push(`/locations/${id}`);
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
