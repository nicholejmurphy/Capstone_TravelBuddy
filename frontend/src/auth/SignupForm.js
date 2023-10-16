import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./SignupForm.css";
import Alerts from "../common/Alerts";

/** Handles user signup attemps.
 *  - Takes in form data and attempts to authenticate
 *    through UserApi
 *  - If valid, login prop will be triggered therefore updated user data across site.
 *  - If invalid data, a list of error messages will show through the { Alert } component
 */
function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // Tracks changes of form data and updates state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // If successful, redirects to homepage
  // if invalid attempt, error messages will be updated
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup(formData);
    if (res.success) {
      history.push("/");
    }
    setFormErrors(res.errors);
  }
  return (
    <div className="SignupForm bg-light p-4 w-100 shadow rounded">
      {formErrors.length ? (
        <Alerts type="danger" messages={formErrors} />
      ) : null}

      <Form onSubmit={handleSubmit}>
        <h2>SignUp</h2>

        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
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
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button className="bg-primary">SignUp</Button>
      </Form>
    </div>
  );
}

export default SignupForm;
