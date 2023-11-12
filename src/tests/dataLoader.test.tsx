import { test, expect } from "vitest";
import dataLoader from "../api/dataLoader";
import { IData } from "../interfaces/IData";

test("dataLoader function returns an array of IData", async () => {
  try {
    const result = await dataLoader();

    const dataArray = result as IData[];

    expect(Array.isArray(dataArray)).toBe(true);

    dataArray.forEach((item) => {
      expect(typeof item).toBe("object");
    });
  } catch (error) {
    expect.fail(
      "dataLoader function threw an error: " + (error as Error).message
    );
  }
});
