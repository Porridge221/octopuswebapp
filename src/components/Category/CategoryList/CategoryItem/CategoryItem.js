import styles from './CategoryItem.module.css';

function CategoryItem({item}) {
  
  const fetchData = () => {
    fetch("https://2a292a84c42d37.lhr.life/createorder", { method:'POST',headers: {
      'Content-Type': 'application/json',
      'Telegram-Data': 'true'
    }, body: JSON.stringify( item )
      })
      .then(response => {
        return JSON.stringify( item )
      })
      .then(data => {
        console.log(JSON.stringify( item ));
      })
  }

  return (
    <li className={styles.root}>
        <div className={styles.Image} ></div>
        <div className={styles.Price}>{item.price}</div>
        <div className={styles.Name}>{item.name}</div>
        <div className={styles.BuyButton} onClick={fetchData}>Купить</div>
    </li>
  );
}

export default CategoryItem;
