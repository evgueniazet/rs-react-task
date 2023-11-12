import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Input from "../components/Input/Input";

test("Input component renders correctly", () => {
  const { getByTestId, container } = render(
    <Input value="Test Value" onChange={() => {}} />
  );

  const inputElement = getByTestId("custom-input") as HTMLInputElement;

  expect(inputElement.tagName).toBe("INPUT");
  expect(inputElement.value).toBe("Test Value");

  expect(container).toBeDefined();
});
