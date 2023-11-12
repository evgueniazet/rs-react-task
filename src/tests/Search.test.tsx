import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search/Search";

test("Search component renders correctly", () => {
  const onSubmitMock = { called: 0 };
  const { container, getByTestId } = render(
    <Search
      onSubmit={() => {
        onSubmitMock.called += 1;
      }}
    />
  );

  const inputElement = getByTestId("custom-input") as HTMLInputElement;
  const formElement = container.querySelector("form") as HTMLFormElement;

  expect(inputElement.tagName).toBe("INPUT");
  expect(inputElement.value).toBe("");

  fireEvent.submit(formElement);
});
