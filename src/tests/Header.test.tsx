import { render, fireEvent } from "@testing-library/react";
import Header from "../components/Header/Header";

test("Header component renders correctly", () => {
  let handleErrorCalled = false;
  const mockHandleError = () => {
    handleErrorCalled = true;
  };

  const { getByTestId, getByAltText, getByText } = render(
    <Header showError={false} handleError={mockHandleError} />
  );

  const headerElement = getByTestId("header");
  expect(headerElement).toBeInTheDocument();

  const logoElement = getByAltText("Rick and Morty Logo");
  expect(logoElement).toBeInTheDocument();

  const buttonElement = getByText("Show error");
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);

  expect(handleErrorCalled).toBe(true);
});
