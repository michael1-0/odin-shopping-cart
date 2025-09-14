import { screen } from "@testing-library/react";
import { test, describe, vi, beforeEach, afterEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./test-utils";

describe("App Logic", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: "Mocked Product",
              price: 9.99,
              description: "Mocked description",
              category: "mock",
              image: "mock.jpg",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should have item in the document", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));

    expect(
      screen.getByRole("heading", { name: /Mocked Product/i })
    ).toBeInTheDocument();
  });

  test("should add new item to cart", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    await user.click(screen.getByRole("link", { name: /cart/i }));

    expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
  });

  test("should only increment if item already exists in cart", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await user.click(screen.getByRole("link", { name: /cart/i }));
    await user.click(screen.getByRole("link", { name: /shop/i }));

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await user.click(screen.getByRole("link", { name: /cart/i }));

    expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
  });

  test("should increment/decrement item on cart page", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await user.click(screen.getByRole("link", { name: /cart/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /cart/i }));
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
  });

  test("should remove item from cart", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await user.click(screen.getByRole("link", { name: /cart/i }));

    await user.click(screen.getByRole("button", { name: /remove item/i }));

    expect(screen.getByText(/cart is empty!/i)).toBeInTheDocument();
  });

  test("should remove item from cart when quantity is 0", async () => {
    renderWithRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /shop/i }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    await user.click(screen.getByRole("link", { name: /cart/i }));
    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText(/cart is empty!/i)).toBeInTheDocument();
  });
});
