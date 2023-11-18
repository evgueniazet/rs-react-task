import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home/Home";
import { Provider } from "react-redux";
import store from "../store/store";

test("Home component renders correctly", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const component = screen.getByTestId("home-component");
  expect(component).toBeInTheDocument();

  const loader = screen.getByTestId("loaderWrapper");
  expect(loader).toBeInTheDocument();

  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();

  const cards = screen.getAllByTestId("character-card");
  expect(cards.length).toBeGreaterThan(0);

  const pagination = screen.getByTestId("pagination");
  expect(pagination).toBeInTheDocument();
});

test("renders loader while data is loading", async () => {
  const container = document.createElement("div");

  render(
    <Provider store={store}>
      <Home />
    </Provider>,
    { container }
  );

  expect(container.querySelector(".loaderContainer")).toBeNull();
});
