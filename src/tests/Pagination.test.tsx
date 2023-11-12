import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "../components/Pagination/Pagination";

describe("Pagination Component", () => {
  test("should increment the page number when clicking the next button", () => {
    const currentPage = 1;
    const handleClickPrev = vi.fn();
    const handleClickNext = vi.fn();

    const { getByText } = render(
      <Pagination
        currentPage={currentPage}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
    );

    const nextButton = getByText(">");
    fireEvent.click(nextButton);

    expect(handleClickNext).toHaveBeenCalledTimes(1);
  });

  test("should decrement the page number when clicking the prev button", () => {
    const currentPage = 2;
    const handleClickPrev = vi.fn();
    const handleClickNext = vi.fn();

    const { getByText } = render(
      <Pagination
        currentPage={currentPage}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
    );

    const prevButton = getByText("<");
    fireEvent.click(prevButton);

    expect(handleClickPrev).toHaveBeenCalledTimes(1);
  });
});
