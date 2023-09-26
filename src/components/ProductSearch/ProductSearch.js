import styles from './ProductSearch.module.css'
import Header from '../Header/Header'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
import CartService from '../../services/cartService';


function ProductSearch() {
    const [cartData, setCartData] = useState(CartService({isUpdate: false, isInit: false}))

    const {variant_id, variant_name, category_id} = useLocation().state;

    const [item, setItem] = useState();

    const user_data = useUser(false)

    const initButtonLabel = () => {
        var label = 'В корзину';
        console.log(cartData.items);
        console.log(item);
        for (var el in cartData.items) {
            console.log('Z nmenen');
            console.log(el);
            console.log(cartData.items[el].variant_id);
            console.log(item.variant_id);
            if (cartData.items[el].variant_id === item?.variant_id) {
                label = 'Удалить';
                break;
            }
        }
        console.log(label);
        return label;
    }

    const [buttonLabel, setButtonLabel] = useState(initButtonLabel());
    const [buttonStyle, setButtonStyle] = useState(styles.BuyButton);

    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate(category_id === -1 ? '/home/' : '/home/categories/' + category_id, {state: category_id}));
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
            console.log(data);
            console.log("Fetch product Done");
            setButtonLabel(buttonLabel === 'В корзину' ? 'Удалить' : 'В корзину');
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
            setButtonLabel(buttonLabel === 'В корзину' ? 'Удалить' : 'В корзину');
            // setButtonStyle(styles.BuyButton + ' ' + styles.BuyButton2);
            // setTimeout(() => {
            //     setButtonStyle(styles.BuyButton);
            // }, 1400);
            console.log(JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} ));
            setCartData(CartService({isUpdate:false, isInit: true}))
        })
    }

    const fetchVariant = () => {
        fetch("https://octopus-vape.ru/products/variant/" + variant_id, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setItem(data);
            setCurrent(data?.name)
        })
    }

    useEffect(() => {
        fetchVariant();
    }, [])

    // const categories = {
    //     6: 'Жидкости',
    //     1: 'JUUL Type',
    //     2: 'Pod Системы',
    //     3: 'Аккумуляторы',
    //     4: 'Аксессуары',
    //     5: 'Жевательный табак',
    //     7: 'Одноразовые системы',
    //     8: 'Расходники',
    //     9: 'Устройства'
    //   }
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
    if (category_id !== -1) {
        path = ['Главная', 'Каталог', categories[category_id]]
    }
    // const current = item.name;
    const [current, setCurrent] = useState(item?.name)

    console.log(variant_id);
    console.log(item);
    return (
    <div className={styles.root}>
        <Header path={path} current={current}/>
        <div className={styles.ImageBox} ><img className={styles.Image} style={{'object-fit': 'contain'}} src={item?.image !== "" ? item?.image : process.env.PUBLIC_URL + "/assets/octopus_big1.jpg"} alt=''/></div>
        <div className={styles.Name}>{item !== undefined && item?.name}</div>
        <div className={styles.Price}>{ item === undefined ? '####' : new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format((user_data?.user?.city_id === 3 ? item?.price_shk/100 : item?.price_vvo/100))}</div>
        <div className={styles.Characteristics}>
            {item !== undefined && item?.item_characteristics?.length > 0 && item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        {/* <div style={{'flex-grow': '1'}}/> */}
        <div className={styles.buttonBox} onClick={fetchData}><div className={buttonStyle} onClick={buttonLabel === 'В корзину' ? fetchData : fetchDeleteItem}><span className={styles.ButtonLabel}>{buttonLabel}</span></div></div>
    </div>
    );
}

export default ProductSearch
