import { test, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import Search from "../components/Search/Search";

beforeEach(() => {
  window.localStorage.clear();
});

test("Search component renders correctly", () => {
  const onSubmitMock = { called: 0 };
  const { container, getByTestId } = render(
    <Provider store={store}>
      <Search
        onSubmit={() => {
          onSubmitMock.called += 1;
        }}
      />
    </Provider>
  );

  const inputElement = getByTestId("custom-input") as HTMLInputElement;
  const formElement = container.querySelector("form") as HTMLFormElement;

  expect(inputElement.tagName).toBe("INPUT");
  expect(inputElement.value).toBe("");

  fireEvent.submit(formElement);
});
