import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}`);

  const createdAt = new Date().toISOString();

  const [row] = input.db.sql<insightsTable.Row>`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${createdAt}, ${input.text})
    RETURNING *
    `;

  if (!row) {
    throw new Error("Failed to create insight");
  }

  return {
    ...row,
    createdAt: new Date(row.createdAt),
  };
};
