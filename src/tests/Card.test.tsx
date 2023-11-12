import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Card from "../components/Card/Card";

test("Card component renders correctly with provided props", () => {
  const name = "John Doe";
  const location = "New York";
  const imgUrl = "https://example.com/image.jpg";

  const { getByRole, getByText } = render(
    <Card name={name} location={location} imgUrl={imgUrl} />
  );

  expect(getByRole("img")).toHaveAttribute("src", imgUrl);
  expect(getByRole("img")).toHaveAttribute("alt", name);
  expect(getByText(`Name: ${name}`)).toBeInTheDocument();
  expect(getByText(`Location: ${location}`)).toBeInTheDocument();
});
