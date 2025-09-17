import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useOutlet } from "react-router";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import "./App.css";

function useAllItems() {
  const [items, setItems] = useState([
    {
      id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, items, error };
}

function useCart() {
  const [cart, setCart] = useState([]);
  return { cart, setCart };
}

function App() {
  const outlet = useOutlet();
  const { isLoading, items, error } = useAllItems();
  const { cart, setCart } = useCart();

  return (
    <>
      <div className="wrapper">
        <Header cart={cart} />
        <main>
          {outlet ? (
            <Outlet context={{ isLoading, items, error, cart, setCart }} />
          ) : (
            <Home />
          )}
        </main>
        <Footer cart={cart} />
      </div>
    </>
  );
}

export default App;
