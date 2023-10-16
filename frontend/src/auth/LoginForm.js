import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./LoginForm.css";
import Alerts from "../common/Alerts";

/** Handles user login attemps.
 *  - Takes in form data and attempts to authenticate
 *    through UserApi
 *  - If valid, login prop will be triggered therefore updated user data across site.
 *  - If invalid data, a list of error messages will show through the { Alert } component
 */
function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    const res = await login(formData);
    if (res.success) {
      history.push("/");
    } else {
      setFormErrors(res.errors);
    }
  }
  return (
    <div className="LoginForm bg-light p-4 w-100 shadow rounded">
      {formErrors.length ? (
        <Alerts type="danger" messages={formErrors} />
      ) : null}

      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button className="bg-primary">Login</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
