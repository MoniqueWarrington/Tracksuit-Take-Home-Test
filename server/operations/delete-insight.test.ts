import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";
import lookupInsight from "./lookup-insight.ts";

describe("deleting an insight from the database", () => {
  describe("specified insight not in the DB", () => {
    withDB((fixture) => {
      let result: boolean;

      beforeAll(() => {
        result = deleteInsight({ ...fixture, id: 0 });
      });

      it("returns false", () => {
        expect(result).toBe(false);
      });
    });
  });

  describe("insight is in the DB", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date(), text: "3" },
        { id: 4, brand: 4, createdAt: new Date(), text: "4" },
      ];

      let result: boolean;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );

        result = deleteInsight({ ...fixture, id: 3 });
      });

      it("returns true", () => {
        expect(result).toBe(true);
      });

      it("removes the insight from the database", () => {
        const deletedInsight = lookupInsight({
          ...fixture,
          id: 3,
        });

        expect(deletedInsight).toBeUndefined();
      });

      it("does not delete the other insights", () => {
        const remainingInsights = insights.filter((insight) =>
          insight.id !== 3
        );

        for (const insight of remainingInsights) {
          const result = lookupInsight({
            ...fixture,
            id: insight.id,
          });

          expect(result).toEqual(insight);
        }
      });
    });
  });
});
