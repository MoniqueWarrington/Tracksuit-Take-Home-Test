type CreateInsightInput = {
  brand: number;
  text: string;
};

export const createInsight = async ({
  brand,
  text,
}: CreateInsightInput) => {
  const response = await fetch("/api/insights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brand,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create insight");
  }
};
