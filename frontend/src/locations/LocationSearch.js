import React, { useState } from "react";
import { Form, Row, Col, Input, Button, FormFeedback } from "reactstrap";

/** Search input for locations
 *
 *  - Parent passes setSearchTerm {state} which will trigger
 *    useEffect updating locations in parent
 *
 */
function LocationSearchForm({ searchTerm, setSearchTerm }) {
  const [formData, setFormData] = useState(searchTerm);
  const [error, setError] = useState(false);

  // Updates serchterm state on form input change
  function handleChange(e) {
    setFormData(e.target.value);
    setError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData) {
      setError(true);
    } else {
      setSearchTerm(formData);
    }
  }

  return (
    <div className="SearchForm mb-4 mt-4 ml-3 vw-75">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Input
              className="shadow"
              id="search"
              name="search"
              type="text"
              placeholder="Search"
              value={formData}
              onChange={handleChange}
            />
            {error && (
              <FormFeedback tooltip invalid>
                Location search can not be empty.
              </FormFeedback>
            )}
          </Col>
          <Col>
            {" "}
            <Button className="bg-info shadow">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default LocationSearchForm;
