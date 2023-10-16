import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
