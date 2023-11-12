import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Button from "../components/Button/Button";

test("renders button with text", async () => {
  const buttonText = "Click me";
  const { getByText } = render(<Button text={buttonText} />);
  expect(getByText(buttonText)).not.toBeNull();
});
