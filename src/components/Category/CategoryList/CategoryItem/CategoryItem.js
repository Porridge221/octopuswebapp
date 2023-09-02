import styles from './CategoryItem.module.css';
import useTelegram from '../../../../hooks/useTelegram';
import {Link} from 'react-router-dom'

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

    <li key={item.id}>
      <Link className={styles.root} to='/home/categories/:id/product' state={item}>
        <div className={styles.Image} ><img style={{'object-fit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} /></div>
        <div className={styles.Name}>{producerName + ' ' + item.name}</div>
        <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo)}</div>
        <div className={styles.BuyButton} onClick={fetchData}>Добавить</div>
      </Link>
    </li>
  );
}

export default CategoryItem;
