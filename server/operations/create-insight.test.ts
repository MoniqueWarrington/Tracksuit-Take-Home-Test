import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import createInsight from "./create-insight.ts";
import lookupInsight from "./lookup-insight.ts";

describe("creating an insight in the database", () => {
  withDB((fixture) => {
    let result: Insight;

    beforeAll(() => {
      result = createInsight({
        ...fixture,
        brand: 1,
        text: "REALLY AMAZING INSIGHT, I LOVE THEM",
      });
    });

    it("returns the created insight", () => {
      expect(result.brand).toBe(1);
      expect(result.text).toBe("REALLY AMAZING INSIGHT, I LOVE THEM");
      expect(result.id).toBeGreaterThan(0);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("creates an insight that can be retrieved", () => {
      const retrieved = lookupInsight({
        ...fixture,
        id: result.id,
      });

      expect(retrieved).toEqual(result);
    });
  });
});
