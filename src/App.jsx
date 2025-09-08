import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useOutlet } from "react-router";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  const outlet = useOutlet();

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>{outlet ? <Outlet /> : <Home />}</main>
        <Footer />
      </div>
    </>
  );
}

export default App;
