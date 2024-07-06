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

    const initButtonLabel = (item) => {
        var label = 'В корзину';
        for (var el in cartData.items) {
            if (cartData.items[el].variant_id === item?.variant_id) {
                label = 'Удалить';
                break;
            }
        }
        return label;
    }

    const [buttonLabel, setButtonLabel] = useState();
    const [buttonStyle, setButtonStyle] = useState(styles.BuyButton);

    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate(category_id === -1 ? '/home/' : '/home/categories/' + category_id, {state: category_id}));
    tg.BackButton.show();

    const fetchData = () => {
        var countItems = 0;
        cartData !== undefined && cartData?.items?.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            cartData.items.forEach(order => {
                countItems += order.count;
        });
        if (countItems >= 10) {
            tg.showAlert('Заказ не может содержать более 10 товаров.');
            return
        }

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

    const fetchVariant = () => {
        fetch("https://octopus-vape.ru/products/variant/" + variant_id, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setItem(data);
            setCurrent(data?.name)
            setButtonLabel(initButtonLabel(data));
        })
    }

    useEffect(() => {
        fetchVariant();
    }, [])

    const categories = {
        6: 'Жидкости',
        1: 'JUUL Type',
        2: 'Pod Системы',
        3: 'Аккумуляторы',
        4: 'Аксессуары',
        5: 'Жевательный табак',
        7: 'Одноразовые системы',
        8: 'Расходники',
        9: 'Устройства',
        10: 'Атомайзеры'
    }
    
    var path = ['Главная']
    if (category_id !== -1) {
        path = ['Главная', 'Каталог', categories[category_id]]
    }
    // const current = item.name;
    const [current, setCurrent] = useState(item?.name)

    return (
    <div className={styles.root}>
        <Header path={path} current={current} cartData={cartData}/>
        <div className={styles.ImageBox} ><img className={styles.Image} src={item?.image !== "" ? item?.image : process.env.PUBLIC_URL + "/assets/octopus_big1.jpg"} alt=''/></div>
    <div style={{flexGrow: '1'}}>
        <div className={styles.Name}>{item !== undefined && item?.name}</div>
        <div className={styles.Price}>{ item === undefined ? '####' : new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(([3, 4, 5].indexOf(user_data?.user?.city_id) !== -1 ? item?.price_shk/100 : item?.price_vvo/100))}</div>
        <div className={styles.Characteristics}>
            {item !== undefined && item?.item_characteristics?.length > 0 && item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        {/* <div style={{'flex-grow': '1'}}/> */}
        <div className={styles.buttonBox} onClick={fetchData}><div className={buttonStyle} onClick={buttonLabel === 'В корзину' ? fetchData : fetchDeleteItem}><span className={styles.ButtonLabel}>{buttonLabel}</span></div></div>
    </div>

    </div>
    );
}

export default ProductSearch
