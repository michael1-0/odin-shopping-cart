import CardItem from "../../components/CardItem/CardItem";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router";

function Shop() {
  const { isLoading, items, error } = useOutletContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered: {error}</p>;

  return (
    <div className={styles["shop-wrapper"]}>
      {items.map((item) => (
        <CardItem item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Shop;
