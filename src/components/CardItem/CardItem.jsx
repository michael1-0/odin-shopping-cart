import { useState } from "react";
import styles from "./CardItem.module.css";
import { useOutletContext } from "react-router";

function ShopPageControls({ item }) {
  const [count, setCount] = useState(0);
  const { setCart } = useOutletContext();

  function handleInputOnChange(e) {
    setCount(e.target.value);
  }

  function handleAddCountClick() {
    setCount((c) => c + 1);
  }

  function handleDecrementCountClick() {
    setCount((c) => {
      if (c <= 0) return c;
      return c - 1;
    });
  }

  function handleSubmit(item, e) {
    e.preventDefault();

    const newItem = { ...item, amount: 0 };
    newItem.amount += count;

    setCart((c) => {
      const foundElement = c.find((element) => element.id === newItem.id);

      if (foundElement) {
        const newCart = structuredClone(c);
        newCart.map((element) => {
          if (element.id === foundElement.id) {
            element.amount += count;
          }
        });
        return newCart;
      }

      return [...c, newItem];
    });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(item, e)}
      className={styles["shop-page-controls"]}
    >
      <div className={styles["controls-wrapper"]}>
        <label>
          <strong>Quantity:</strong>
        </label>
        <div>
          <input
            type="number"
            min={0}
            onChange={(e) => handleInputOnChange(e)}
            value={count}
            readOnly
          />
          <div>
            <button onClick={handleAddCountClick} type="button">
              +
            </button>
            <button onClick={handleDecrementCountClick} type="button">
              -
            </button>
          </div>
        </div>
      </div>
      <button type="submit">Add to Cart</button>
    </form>
  );
}

function CartPageItemControls({ itemId, setCart }) {
  function handleDecrementItemClick() {
    setCart((c) => {
      const newCart = structuredClone(c);
      newCart.map((item) => {
        if (item.id === itemId) {
          item.amount--;
        }
      });

      const filteredCart = newCart.filter((item) => {
        return item.amount > 0;
      });

      return filteredCart;
    });
  }

  function handleIncrementItemClick() {
    setCart((c) => {
      const newCart = structuredClone(c);
      newCart.map((item) => {
        if (item.id === itemId) {
          item.amount++;
        }
      });
      return newCart;
    });
  }

  function handleRemoveItemClick() {
    setCart((c) => {
      const filteredCart = structuredClone(c).filter(
        (item) => item.id !== itemId
      );
      return filteredCart;
    });
  }

  return (
    <div className={styles["cart-item-controls"]}>
      <div>
        <button onClick={handleDecrementItemClick}>-</button>
        <button onClick={handleIncrementItemClick}>+</button>
      </div>
      <button onClick={handleRemoveItemClick}>Remove Item</button>
    </div>
  );
}

function CardItem({ item, isCartItem = false, setCart }) {
  function truncateWithEllipsis(str, maxLength = 75) {
    const ellipsis = "...";
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }

  return (
    <div
      className={
        isCartItem ? `${styles.card} ${styles["cart-item"]}` : styles.card
      }
    >
      <img src={item.image} alt="alt cunningham" />
      <div className={styles.middle}>
        <h3>{item.title}</h3>
        <h4 className={styles.price}>${item.price}</h4>
        {!isCartItem ? (
          <div>
            <p>{truncateWithEllipsis(item.description)}</p>
          </div>
        ) : null}
        <div className={styles.category}>
          <strong>Category:</strong> <br /> {item.category}.
        </div>
        {isCartItem ? (
          <div>
            <strong>Quantity:</strong> {item.amount}
          </div>
        ) : null}
      </div>
      {!isCartItem ? (
        <ShopPageControls item={item} />
      ) : (
        <CartPageItemControls itemId={item.id} setCart={setCart} />
      )}
    </div>
  );
}

export default CardItem;
