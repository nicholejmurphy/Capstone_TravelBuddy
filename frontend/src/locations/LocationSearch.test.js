import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import LocationSearchForm from "./LocationSearch";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LocationSearchForm setSearchTerm={null} searchTerm={""} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocationSearchForm setSearchTerm={null} searchTerm={""} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
