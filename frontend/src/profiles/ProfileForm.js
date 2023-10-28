import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alerts from "../common/Alerts";
import UserContext from "../auth/UserContext";
import UserApi from "../api/userApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

/** Handles user profile information update
 *  - Pulls user data from currUser state to populate form.
 *  - Requires password input to verify submission
 *  - Updates user info across site state.
 */
function ProfileForm({ logout }) {
  const history = useHistory();
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useState(false);

  /** Handle form input changes
   *  - update formData state to catch all form changes
   *
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** Handle form submition
   *  - Attempts to updated profile through UserApi
   *   { data } => { user }
   *  - If valid user,
   *    - Update form data and clear password
   *    - Update currUser across application
   *    - Reset formErrors
   *  - If invalid request, show errors
   *
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    const userId = currUser.id;
    let updatedUser;

    try {
      updatedUser = await UserApi.updateProfile(userId, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    setCurrUser(updatedUser);
    setUpdateConfirmed(true);
    setFormData((data) => ({ ...data, password: "" }));
    setFormErrors([]);
  }

  async function handleDelete(e) {
    e.preventDefault();
    UserApi.deleteProfile(currUser.id);
    logout();
    alert(`${currUser.username} has been successfully deleted.`);
    history.push("/");
  }

  return (
    <div className="ProfileForm bg-light p-4 w-100 shadow rounded">
      {updateConfirmed ? (
        <Alerts
          type="success"
          messages={["Profile has been successfully updated!"]}
        />
      ) : null}
      {formErrors ? <Alerts type="error" messages={formErrors} /> : null}
      <Form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={currUser.username}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First name</Label>
          <Input
            id="first_name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name</Label>
          <Input
            id="last_name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <Button className="bg-primary">Update</Button>
        <br />
        <Button className="bg-danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
