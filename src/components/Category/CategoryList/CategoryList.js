import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"

function CategoryList() {

  const [items, setItems] = useState([])

  const fetchData = () => {
    fetch("http://localhost:8000", {body: JSON.stringify({"id": 1})})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setItems(data)
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    items.length > 0 ? (
      <ul className={styles.root}>
          {items.map(item => (
            <CategoryItem key={item.id} item={item} />
          ))}
      </ul>
    ) : (<div>Нет данных</div>)
  );
}

export default CategoryList;