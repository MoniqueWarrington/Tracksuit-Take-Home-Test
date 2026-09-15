import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { AddInsight } from "./add-insight.tsx";
import { BRANDS } from "../../lib/consts.ts";

vi.mock("../modal/modal.tsx", () => ({
  Modal: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("add insight", () => {
  it("renders", () => {
    const { getByText } = render(
      <AddInsight
        open={true}
        onClose={vi.fn()}
        onCreated={vi.fn()}
      />,
    );

    expect(getByText("Add a new insight")).toBeTruthy();
    expect(getByText("Add insight")).toBeTruthy();
  });

  it("renders all brands", () => {
    const { getByRole } = render(
      <AddInsight
        open={true}
        onClose={vi.fn()}
        onCreated={vi.fn()}
      />,
    );

    const select = getByRole("combobox");

    for (const brand of BRANDS) {
      expect(select).toHaveTextContent(brand.name);
    }
  });
});