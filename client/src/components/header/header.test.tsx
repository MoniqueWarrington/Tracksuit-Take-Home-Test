import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Header, HEADER_TEXT } from "./header.tsx";

afterEach(() => {
  cleanup();
});

describe("header", () => {
  it("renders", () => {
    const { getByText } = render(
      <Header onInsightCreated={vi.fn()} />,
    );

    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });

  it("renders the add insight button", () => {
    const { getByRole } = render(
      <Header onInsightCreated={vi.fn()} />,
    );

    expect(
      getByRole("button", { name: "Add insight" }),
    ).toBeTruthy();
  });
});