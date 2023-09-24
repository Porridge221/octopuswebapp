import styles from './CategoryItem.module.css';
import useTelegram from '../../../../hooks/useTelegram';
import {Link, useLocation} from 'react-router-dom'
import CartService from '../../../../services/cartService';
import { useState } from 'react';

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
        setButtonLabel(buttonLabel === 'Добавить' ? 'Удалить' : 'Добавить');
        // setButtonStyle(styles.BuyButton + ' ' + styles.BuyButton1);
        // setTimeout(() => {
        //     setButtonStyle(styles.BuyButton);
        // }, 1400);
        console.log(JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} ));
        return CartService({isUpdate:true, isSet: false})
      })
  }

  const fetchDeleteItem = () => {
    fetch("https://octopus-vape.ru/carts/delete_one", { method:'DELETE',headers: {
    'Content-Type': 'application/json',
    'Telegram-Data': initData,
    }, body: JSON.stringify( {'cart_id': 1, 'variant_id': item.variant_id} )
    })
    .then(response => {
        return response
    })
    .then(data => {
        console.log(data);
        setButtonLabel(buttonLabel === 'Добавить' ? 'Удалить' : 'Добавить');
        // setButtonStyle(styles.BuyButton + ' ' + styles.BuyButton2);
        // setTimeout(() => {
        //     setButtonStyle(styles.BuyButton);
        // }, 1400);
        console.log(JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} ));
    })
  }

  // console.log(item.variant_id)

  const cartData = CartService({isUpdate:false, isSet: false});

  const initButtonLabel = () => {
    var label = 'Добавить';
    // console.log(cartData.items);
    // console.log(item);
    for (var el in cartData.items) {
        console.log('Z nmenen');
        console.log(el);
        console.log(cartData.items[el].variant_id);
        console.log(item.variant_id);
        if (cartData.items[el].variant_id === item.variant_id) {
            label = 'Удалить';
            break;
        }
    }
    // console.log(label);
    return label;
  } 

  const [buttonLabel, setButtonLabel] = useState(initButtonLabel());
  const [buttonStyle, setButtonStyle] = useState(styles.BuyButton);

  return (


      <div className={styles.root}>
        <Link className={styles.Link} to={`/home/categories/${category_id}/product`} state={{item: item, category_id: category_id}}>
          <div className={styles.Image} ><img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt='' /></div>
          <div className={styles.Name}>{item.name}</div>
          <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo/100)}</div>
        </Link>
          <div className={buttonStyle} onClick={buttonLabel === 'Добавить' ? fetchData : fetchDeleteItem}>{buttonLabel}</div>
      </div>
  );
}

export default CategoryItem;
