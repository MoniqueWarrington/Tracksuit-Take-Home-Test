import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal } from "./modal.tsx";

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal open={false} onClose={() => undefined}>
        Closed modal
      </Modal>,
    );

    expect(screen.queryByText("Closed modal")).toBeFalsy();
  });

  it("renders when open", () => {
    render(
      <Modal open onClose={() => undefined}>
        <div>Open modal</div>
      </Modal>,
    );

    expect(screen.getByText("Open modal")).toBeTruthy();
  });
});
