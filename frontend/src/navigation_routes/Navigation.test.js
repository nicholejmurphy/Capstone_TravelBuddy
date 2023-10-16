import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
