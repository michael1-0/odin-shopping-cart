import { useOutletContext } from "react-router";
import CardItem from "../../components/CardItem/CardItem";

function Cart() {
  const { cart, setCart } = useOutletContext();

  if (cart.length <= 0) return "Cart is empty!";

  return (
    <div>
      <div>
        {cart.map((item) => (
          <CardItem
            item={item}
            key={item.id}
            isCartItem={true}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
