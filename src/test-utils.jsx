import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "./routes"; 

export function renderWithRouter() {
  const router = createMemoryRouter(routes);

  return {
    ...render(<RouterProvider router={router} />),
    router,
  };
}
