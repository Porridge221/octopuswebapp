import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"
import useTelegram from '../../../hooks/useTelegram';
import axios from 'axios'
import React from 'react'
import CategoryGroup from './CategoryGroup/CategoryGroup';
import { useLocation } from 'react-router-dom';


function CategoryList({result, cartData, setCartData}) {
  const category_id = useLocation().state;

  const {initData} = useTelegram();

  // const [result, setItems] = useState([])

  //const {initData} = useTelegram();  

  // const fetchData = () => {
  //   fetch("https://octopus-vape.ru/products/catalog/" + category_id, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setItems(data);
  //       handleCallback(data)
  //     })
  // }

  // useEffect(() => {

  //   fetchData();

  //   // eslint-disable-next-line
  // }, [])

  return (
    result.length > 0 ? (
      <div className={styles.root}>
          {result.map(producer => ( producer.items.length > 0 &&
            <CategoryGroup key={producer.product_id} producer={producer} cartData={cartData} setCartData={setCartData}/>
          ))}
      </div>
    ) : (<div>Нет данных</div>)
    // items.length > 0 ? (
    //   <ul className={styles.root}>
    //       {items.map(item => (
    //         <CategoryItem key={item.id} item={item} />
    //       ))}
    //   </ul>
    // ) : (<div>Нет данных</div>)
  );
}

export default CategoryList;