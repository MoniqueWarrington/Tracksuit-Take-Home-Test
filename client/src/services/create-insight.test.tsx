import { describe, expect, it, vi } from "vitest";
import { createInsight } from "./create-insight.ts";

describe("createInsight", () => {
  it("creates an insight", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(null, {
          status: 201,
        }),
      );

    await createInsight({
      brand: 1,
      text: "Something insightful",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/insights",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: 1,
          text: "Something insightful",
        }),
      },
    );

    vi.restoreAllMocks();
  });

  it("throws when creating an insight fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(
      createInsight({
        brand: 1,
        text: "Something insightful",
      }),
    ).rejects.toThrow("Failed to create insight");

    vi.restoreAllMocks();
  });
});