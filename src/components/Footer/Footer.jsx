import styles from "./Footer.module.css";

function Footer({ cart = [] }) {
  let money = 0;
  cart.map((item) => {
    if (item) {
      money += item.amount * item.price;
    }
  });
  return <footer className={styles.footer}> ${money.toFixed(2)} to be paid </footer>;
}

export default Footer;
