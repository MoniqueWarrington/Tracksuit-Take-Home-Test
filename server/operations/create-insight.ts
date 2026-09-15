import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import lookupInsight from "./lookup-insight.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}, text=${input.text}`);

  const createdAt = new Date().toISOString();

  input.db.sql`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${createdAt}, ${input.text})
  `;

  const [row] = input.db.sql<{ id: number }>`
    SELECT id
    FROM insights
    WHERE brand = ${input.brand}
      AND createdAt = ${createdAt}
      AND text = ${input.text}
    ORDER BY id DESC
    LIMIT 1
  `;

  if (!row) {
    throw new Error("Failed to create insight");
  }

  const result = lookupInsight({
    db: input.db,
    id: row.id,
  });

  if (!result) {
    throw new Error("Failed to retrieve created insight");
  }

  return result;
};
