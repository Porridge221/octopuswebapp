import styles from './CategoryItem.module.css';

function CategoryItem({item}) {
  
  const fetchData = () => {
    fetch("https://octopusbot-1-k6943301.deta.app/createorder", { method:'POST',headers: {
      'Content-Type': 'application/json'
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
