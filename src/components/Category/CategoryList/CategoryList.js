import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"
import useTelegram from '../../../hooks/useTelegram';
//import axios from 'axios'

function CategoryList() {

  const [items, setItems] = useState([])

  const {initData} = useTelegram();
  //const initData = 'query_id=AAH4j_ZmAgAAAPiP9mbhemjf&user=%7B%22id%22%3A6022402040%2C%22first_name%22%3A%22Debora%22%2C%22last_name%22%3A%22Landau%22%2C%22username%22%3A%22porridge221%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1692771816&hash=9515f6c19bbf76fc35b29df2eb0bcd97d93ade207b37238ae145abc5d7fc28ce'

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

    // axios({url: "http://localhost:8000/variants", method: "GET", headers: {'Telegram-Data': 'fdgdfg'}}).then((resp) => {
    //   const allItems = resp.data;
    //   setItems(allItems);
    // });

    // eslint-disable-next-line
  }, [initData])

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