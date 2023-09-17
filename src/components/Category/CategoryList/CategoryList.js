import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import { useEffect, useState } from "react"
import useTelegram from '../../../hooks/useTelegram';
import axios from 'axios'
import React from 'react'
import CategoryGroup from './CategoryGroup/CategoryGroup';
import { useLocation } from 'react-router-dom';

// const initData = 'query_id=AAH4j_ZmAgAAAPiP9mbhemjf&user=%7B%22id%22%3A6022402040%2C%22first_name%22%3A%22Debora%22%2C%22last_name%22%3A%22Landau%22%2C%22username%22%3A%22porridge221%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1692771816&hash=9515f6c19bbf76fc35b29df2eb0bcd97d93ade207b37238ae145abc5d7fc28ce'

// const result = [
//   {
//       'id': 1,
//       'product_name': 'Alaska',
//       'items': [
//         {
//           'id': 8,
//           'name': 'Berry Mint Lemonade Extra',
//           'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//           'price_vvo': 500,
//           'price_shk': 500,
//           'item_characteristics': [
//               {
//                   'name': 'Крепость',
//                   'value': '20'
//               }
//           ]
//         },
//         {
//           'id': 2,
//           'name': 'Cherry Candy',
//           'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//           'price_vvo': 500,
//           'price_shk': 500,
//           'item_characteristics': [
//               {
//                   'name': 'Крепость',
//                   'value': '20'
//               }
//           ]
//         },
//         {
//           'id': 3,
//           'name': 'Double Mango',
//           'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//           'price_vvo': 500,
//           'price_shk': 500,
//           'item_characteristics': [
//               {
//                   'name': 'Крепость',
//                   'value': '20'
//               }
//           ]
//         }
//       ]
//   },
//   {
//     'id': 4,
//     'product_name': '3 Bubbles',
//     'items': [
//       {
//         'id': 7,
//         'name': 'Vapobasa',
//         'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//         'price_vvo': 500,
//         'price_shk': 500,
//         'item_characteristics': [
//             {
//                 'name': 'Крепость',
//                 'value': '20'
//             }
//         ]
//       },
//       {
//         'id': 5,
//         'name': 'Vapolicious',
//         'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//         'price_vvo': 500,
//         'price_shk': 500,
//         'item_characteristics': [
//             {
//                 'name': 'Крепость',
//                 'value': '20'
//             }
//         ]
//       },
//       {
//         'id': 6,
//         'name': 'Vazooka',
//         'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//         'price_vvo': 1300,
//         'price_shk': 500,
//         'item_characteristics': [
//             {
//                 'name': 'Крепость',
//                 'value': '20'
//             }
//         ]
//       }
//     ]
// }
// ]

function CategoryList({handleCallback}) {
  const category_id = useLocation().state;

  const {initData} = useTelegram();

  const [result, setItems] = useState([])

  //const {initData} = useTelegram();  

  const fetchData = () => {
    fetch("https://octopus-vape.ru/products/catalog/" + category_id, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setItems(data);
        handleCallback(data)
      })
  }

  useEffect(() => {

    fetchData();

    // axios({url: "http://localhost:8000/variants", method: "GET", headers: {'Telegram-Data': initData}}).then((resp) => {
    //   const allItems = resp.data;
    //   setItems(allItems);
    // });

    // eslint-disable-next-line
  }, [])

  return (
    result.length > 0 ? (
      <div className={styles.root} onScroll={this.listenScrollEvent.bind(this)}>
          {result.map(producer => ( 
            <CategoryGroup key={producer.product_id} producer={producer}/>
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