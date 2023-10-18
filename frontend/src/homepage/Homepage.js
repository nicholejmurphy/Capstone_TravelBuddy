import React, { useContext } from "react";
// import "./Homepage.css";
import {
  Button,
  //   CardBody,
  //   CardSubtitle,
  //   CardText,
  //   CardTitle,
} from "reactstrap";
import UserContext from "../auth/UserContext";

// updated default user location with TravelApi.update({ locationId, locationName })

function Homepage() {
  const { currUser } = useContext(UserContext);

  const [locations, setLocations] = useState(null);

  async function searchFor(name) {
    let res = await TravelApi.searchLocation(name, (category = "geos"));
    setLocations(res);
  }

  function isLoggedIn() {
    return (
      <div>
        <h3>Welcome back, {currUser.firstName}!</h3>
      </div>
    );
  }

  function notLoggedIn() {
    return (
      <div>
        <h3>Welcome to TravelBuddy!</h3>
        <p>Login or Signup to get started.</p>
        <Button className="bg-primary" tag="a" href="/login">
          Login
        </Button>
        <Button className="bg-primary" tag="a" href="/signup">
          SignUp
        </Button>
      </div>
    );
  }

  return currUser ? isLoggedIn() : notLoggedIn();
}

export default Homepage;
