import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Insights } from "./insights.tsx";

afterEach(() => {
  cleanup();
});

const TEST_INSIGHTS = [
  {
    id: 1,
    brandId: 1,
    date: new Date(),
    text: "Test insight",
  },
  {
    id: 2,
    brandId: 2,
    date: new Date(),
    text: "Another test insight",
  },
];

describe("insights", () => {
  it("renders", () => {
    const onInsightDeleted = () => undefined;

    const { getByText } = render(
      <Insights
        insights={TEST_INSIGHTS}
        onInsightDeleted={onInsightDeleted}
      />,
    );

    expect(getByText(TEST_INSIGHTS[0].text)).toBeTruthy();
  });

  it("renders a delete button for each insight", () => {
    const onInsightDeleted = () => undefined;

    const { getAllByRole } = render(
      <Insights
        insights={TEST_INSIGHTS}
        onInsightDeleted={onInsightDeleted}
      />,
    );

    expect(getAllByRole("button")).toHaveLength(TEST_INSIGHTS.length);
  });
});