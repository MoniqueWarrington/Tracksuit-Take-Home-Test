import type { Insight } from "../schemas/insight.ts";

type ApiInsight = {
  id: number;
  brand: number;
  createdAt: string;
  text: string;
};

export const mapInsight = (insight: ApiInsight): Insight => ({
  id: insight.id,
  brandId: insight.brand,
  date: new Date(insight.createdAt),
  text: insight.text,
});
