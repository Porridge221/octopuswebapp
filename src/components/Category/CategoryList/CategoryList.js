import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"

function CategoryList() {

  const [items, setItems] = useState([])

  const fetchData = () => {
    fetch("https://octopusbot-1-k6943301.deta.app/variants")
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
    <div>
      <ul className={styles.root}>
          {items.map(item => (
            <CategoryItem key={item.id} item={item} />
          ))}
      </ul>
    </div>
    ) : (<div>Нет данных</div>)
  );
}

export default CategoryList;