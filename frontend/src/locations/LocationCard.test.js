import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import LocationCard from "./LocationCard";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LocationCard
        id={"123"}
        name={"test_location"}
        address={"test_address"}
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
      <LocationCard
        id={"123"}
        name={"test_location"}
        address={"test_address"}
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
