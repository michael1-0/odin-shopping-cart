import App from "./App";
import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";
import NotFound from "./NotFound";

const routes = [
  { 
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
