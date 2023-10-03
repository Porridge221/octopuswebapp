import styles from './CategoryItem.module.css';
import useTelegram from '../../../../hooks/useTelegram';
import {Link, useLocation} from 'react-router-dom'
import CartService from '../../../../services/cartService';
import { useState } from 'react';
import useUser from '../../../../hooks/useUser';

function CategoryItem({item, producerName}) {
  const category_id = useLocation().state;

  const user_data = useUser(false)

  const {initData} = useTelegram();

  const [cartData, setCartData] = useState(CartService({isUpdate: false, isInit: false}))
  
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
        setCartData(CartService({isUpdate:false, isInit: true}))
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

  const [imageVar, setImageVar] = useState(item?.image)

  return (


      <div className={styles.root}>
        <Link className={styles.Link} to={`/home/product`} state={{variant_id: item.variant_id, variant_name: item.name, category_id: category_id}}>
          <div className={styles.ImageBox} ><img className={styles.Image} src={imageVar} alt='' onError={(ev) => setImageVar(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")} /></div>
          <div className={styles.Name}>{item.name}</div>
          <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(([3, 4].indexOf(user_data?.user?.city_id) !== -1 ? item.price_shk/100 : item.price_vvo/100))}</div>
        </Link>
          <div className={buttonStyle} onClick={buttonLabel === 'Добавить' ? fetchData : fetchDeleteItem}>{buttonLabel}</div>
      </div>
  );
}

export default CategoryItem;
