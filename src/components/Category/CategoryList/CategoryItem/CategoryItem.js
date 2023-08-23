import styles from './CategoryItem.module.css';

function CategoryItem({item}) {
  
  const fetchData = () => {
    fetch("https://octopusbot-1-k6943301.deta.app/createorder", { method:'POST',headers: {
      'Content-Type': 'application/json',
      'Telegram-Data': 'query_id=AAH4j_ZmAgAAAPiP9mZgcz3Q&user=%7B%22id%22%3A6022402040%2C%22first_name%22%3A%22Debora%22%2C%22last_name%22%3A%22Landau%22%2C%22username%22%3A%22porridge221%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1692761838&hash=19a8574d0d965d89b7608c5eb5c6855c958eb28e88cb150fcea80c87596b72f4'
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
