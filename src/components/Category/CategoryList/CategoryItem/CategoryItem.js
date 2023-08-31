import styles from './CategoryItem.module.css';
import useTelegram from '../../../../hooks/useTelegram';

function CategoryItem({item, producerName}) {

  const {initData} = useTelegram();
  
  const fetchData = () => {
    fetch("https://octopusbot-1-k6943301.deta.app/createorder", { method:'POST',headers: {
      'Content-Type': 'application/json',
      'Telegram-Data': initData
    }, body: JSON.stringify( item )
      })
      .then(response => {
        return JSON.stringify( item )
      })
      .then(data => {
        console.log(JSON.stringify( item ));
      })
  }

  console.log(item.id)

  return (
    <li key={item.id} className={styles.root}>
        <div className={styles.Image} ></div>
        <div className={styles.Price}>{item.price}</div>
        <div className={styles.Name}>{producerName + ' ' + item.name}</div>
        <div className={styles.BuyButton} onClick={fetchData}>Купить</div>
    </li>
  );
}

export default CategoryItem;
