import styles from './Product.module.css'
import Header from '../Header/Header'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import CartService from '../../services/cartService';
import useUser from '../../hooks/useUser';

function Product() {
    const [cartData, setCartData] = useState(CartService({isUpdate: false, isInit: false}))

    const user_data = useUser(false)

    const {item, category_id} = useLocation().state;

    const initButtonLabel = () => {
        var label = 'В корзину';
        for (var el in cartData.items) {
            if (cartData.items[el].variant_id === item.variant_id) {
                label = 'Удалить';
                break;
            }
        }
        return label;
    }

    const [buttonLabel, setButtonLabel] = useState(initButtonLabel());
    const [buttonStyle, setButtonStyle] = useState(styles.BuyButton);

    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home/categories/' + category_id, {state: category_id}));
    tg.BackButton.show();
  
    const fetchData = () => {
        fetch("https://octopus-vape.ru/carts/add", { method:'POST',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} )
        })
        .then(response => {
            return response
        })
        .then(data => {
            setButtonLabel(buttonLabel === 'В корзину' ? 'Удалить' : 'В корзину');
            // setButtonStyle(styles.BuyButton + ' ' + styles.BuyButton1);
            // setTimeout(() => {
            //     setButtonStyle(styles.BuyButton);
            // }, 1400);
            CartService({isUpdate:false, isInit: true}).then((val) => {
                setCartData(val)
            })
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
            setButtonLabel(buttonLabel === 'В корзину' ? 'Удалить' : 'В корзину');
            // setButtonStyle(styles.BuyButton + ' ' + styles.BuyButton2);
            // setTimeout(() => {
            //     setButtonStyle(styles.BuyButton);
            // }, 1400);
            CartService({isUpdate:false, isInit: true}).then((val) => {
                setCartData(val)
            })
        })
    }

    const categories = {
        6: 'Жидкости',
        1: 'JUUL Type',
        2: 'Pod Системы',
        3: 'Аккумуляторы',
        4: 'Аксессуары',
        5: 'Жевательный табак',
        7: 'Одноразовые системы',
        8: 'Расходники',
        9: 'Устройства'
      }
    var path = ['Главная']
    if (category_id < 500) {
        path = ['Главная', 'Каталог', categories[category_id]]
    }
    const current = item.name;

    return (
    <div className={styles.root}>
        <Header path={path} current={current}/>
        <div className={styles.ImageBox} ><img className={styles.Image} style={{'object-fit': 'contain'}} src={item.image !== "" ? item.image : process.env.PUBLIC_URL + "/assets/octopus_big1.jpg"} alt=''/></div>
        <div className={styles.Name}>{item.name}</div>
        <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(([3, 4].indexOf(user_data?.user?.city_id) !== -1 ? item.price_shk/100 : item.price_vvo/100))}</div>
        <div className={styles.Characteristics}>
            {item.item_characteristics.length > 0 && item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        {/* <div style={{'flex-grow': '1'}}/> */}
        <div className={styles.buttonBox}><div className={buttonStyle} onClick={buttonLabel === 'В корзину' ? fetchData : fetchDeleteItem}><span className={styles.ButtonLabel}>{buttonLabel}</span></div></div>
    </div>
    );
}

export default Product
