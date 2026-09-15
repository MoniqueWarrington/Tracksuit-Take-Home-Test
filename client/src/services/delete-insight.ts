export const deleteInsight = async (id: number) => {
  const response = await fetch(`/api/insights/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete insight");
  }
};
