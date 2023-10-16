import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import PrivateRoute from "./PrivateRoutes";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <UserProvider>
        <PrivateRoute />
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
        <PrivateRoute />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
