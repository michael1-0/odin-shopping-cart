import { Link } from "react-router";
import style from "./Header.module.css";

function Header({ cart = [] }) {
  const count = cart.length;

  return (
    <header className={style.header}>
      <div>
        {count > 1 ? `${count} items in cart` : `${count} item in cart`}
      </div>
      <nav className={style.nav}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
