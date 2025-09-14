import { it, describe, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../test-utils";

describe("Header", () => {
  it("should match snapshot", () => {
    const { container } = renderWithRouter();
    expect(container).toMatchSnapshot();
  });

  it("should render correct header links", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });
});
