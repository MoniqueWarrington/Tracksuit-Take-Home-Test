import { describe, expect, it, vi } from "vitest";
import { deleteInsight } from "./delete-insight.ts";

describe("deleteInsight", () => {
  it("deletes an insight", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(null, {
          status: 200,
        }),
      );

    await deleteInsight(1);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/insights/1",
      {
        method: "DELETE",
      },
    );

    vi.restoreAllMocks();
  });

  it("throws when deleting an insight fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(
      deleteInsight(1),
    ).rejects.toThrow("Failed to delete insight");

    vi.restoreAllMocks();
  });
});
