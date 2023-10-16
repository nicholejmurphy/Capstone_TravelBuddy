import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Alerts from "./Alerts";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Alerts type={"success"} messages={["success"]} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Alerts type={"success"} messages={["success"]} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
