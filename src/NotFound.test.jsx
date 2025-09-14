import NotFound from "./NotFound";
import { MemoryRouter, Route, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

test("shows 404 message", () => {
  render(
    <MemoryRouter initialEntries={["/bad-path"]}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});
