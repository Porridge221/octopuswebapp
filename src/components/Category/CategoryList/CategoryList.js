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

  return (
    result.length > 0 ? (
      <div className={styles.root}>
          {result.map(producer => ( producer.items.length > 0 &&
            <CategoryGroup key={producer.product_id} producer={producer} cartData={cartData} setCartData={setCartData}/>
          ))}
      </div>
    ) : (<div>Нет данных</div>)
  );
}

export default CategoryList;