import { render, cleanup } from "@testing-library/react";
import Error from "../pages/Error/Error";

afterEach(cleanup);

describe("Error Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Error />);
    expect(getByText("Error 404")).toBeInTheDocument();
  });
});
