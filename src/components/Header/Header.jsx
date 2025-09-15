import { Link } from "react-router";
import style from "./Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <div>Header</div>
      <nav className={style.nav}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
