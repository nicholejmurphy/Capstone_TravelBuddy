import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import LocationDetails from "./LocationDetails";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LocationDetails />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocationDetails />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
