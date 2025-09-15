import { useOutletContext } from "react-router";
import CardItem from "../../components/CardItem/CardItem";
import styles from "./Cart.module.css";

function Cart() {
  const { cart, setCart } = useOutletContext();

  if (cart.length <= 0)
    return <div className={styles["text-center"]}>Cart is empty!</div>;

  return (
    <div className={styles.wrapper}>
      {cart.map((item) => (
        <CardItem
          item={item}
          key={item.id}
          isCartItem={true}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default Cart;
