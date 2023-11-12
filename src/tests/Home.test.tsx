import Home from "../pages/Home/Home";
import { render, screen } from "@testing-library/react";

test("Home component renders correctly", () => {
  render(<Home />);

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

  render(<Home />, { container });

  expect(container.querySelector(".loaderContainer")).toBeNull();
});
