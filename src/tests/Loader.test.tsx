import Loader from "../components/Loader/Loader";
import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Loader.tsx", () => {
  it("Check if the Loader render well", () => {
    render(<Loader />);
    screen.debug();
  });
});
