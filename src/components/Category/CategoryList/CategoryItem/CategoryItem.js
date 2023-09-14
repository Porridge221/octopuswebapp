import styles from './CategoryItem.module.css';
import useTelegram from '../../../../hooks/useTelegram';
import {Link, useLocation} from 'react-router-dom'

function CategoryItem({item, producerName}) {
  const category_id = useLocation().state;

  const {initData} = useTelegram();
  
  const fetchData = () => {
    fetch("https://octopus-vape.ru/carts/add", { method:'POST',headers: {
      'Content-Type': 'application/json',
      'Telegram-Data': initData,
    }, body: JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} )
      })
      .then(response => {
        return JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} )
      })
      .then(data => {
        console.log(JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} ));
      })
  }

  // console.log(item.variant_id)

  return (


      <div className={styles.root}>
        <Link className={styles.Link} to={`/home/categories/${category_id}/product`} state={{item: item, category_id: category_id}}>
          <div className={styles.Image} ><img style={{'objectFit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt='' /></div>
          <div className={styles.Name}>{item.name}</div>
          <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo/100)}</div>
        </Link>
          <div className={styles.BuyButton} onClick={fetchData}>Добавить</div>
      </div>
  );
}

export default CategoryItem;
