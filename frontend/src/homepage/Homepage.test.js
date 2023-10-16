import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Homepage from "./Homepage";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
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
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot w/ no user logged in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider currentUser={null}>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
