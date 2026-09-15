import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): boolean => {
  console.log(`Deleting insight for id=${input.id}`);

  const [row] = input.db.sql<insightsTable.Row>`
    DELETE FROM insights
    WHERE id = ${input.id}
    RETURNING *
  `;

  if (!row) {
    console.log("Insight not found");
    return false;
  }

  console.log("Insight deleted:", row);

  return true;
};
