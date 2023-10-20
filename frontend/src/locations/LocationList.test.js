import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import LocationList from "./LocationList";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LocationList
        locations={[
          {
            location_id: "123",
            name: "test",
            address_obj: { address_string: "test" },
          },
        ]}
      />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocationList
        locations={[
          {
            location_id: "123",
            name: "test",
            address_obj: { address_string: "test" },
          },
        ]}
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
