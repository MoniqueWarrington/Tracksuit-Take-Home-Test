import { describe, expect, it } from "vitest";
import { mapInsight } from "./insight.ts";

describe("mapInsight", () => {
  it("maps an API insight to the UI insight", () => {
    const result = mapInsight({
      id: 1,
      brand: 42,
      createdAt: "2026-09-15T08:00:00.000Z",
      text: "Something insightful",
    });

    expect(result).toEqual({
      id: 1,
      brandId: 42,
      date: new Date("2026-09-15T08:00:00.000Z"),
      text: "Something insightful",
    });
  });
});
