import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import LocationReviewList from "./LocationReviewList";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LocationReviewList reviews={[]} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot for no reviews", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocationReviewList reviews={[]} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot with reviews", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocationReviewList reviews={[{}]} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
