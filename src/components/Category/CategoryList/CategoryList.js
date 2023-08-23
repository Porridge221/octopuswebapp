import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"
import useTelegram from '../../../hooks/useTelegram';

function CategoryList() {

  const [items, setItems] = useState([])

  const {initData} = useTelegram();

  const fetchData = () => {
    fetch("https://octopusbot-1-k6943301.deta.app/variants", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData}})
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