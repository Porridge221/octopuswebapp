import styles from './ProductSearch.module.css'
import Header from '../Header/Header'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


function ProductSearch() {
    const {variant_id, variant_name} = useLocation().state;

    const [item, setItem] = useState();

    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home/'));
    tg.BackButton.show();
  
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

    const fetchVariant = () => {
        fetch("https://octopus-vape.ru/products/variant/" + variant_id, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setItem(data);
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
    var path = ['Главная']
    // if (category_id < 500) {
    //     path = ['Главная', 'Каталог', categories[category_id]]
    // }
    const current = variant_name;

    console.log(variant_id);
    console.log(item);
    return (
    <div className={styles.root}>
        <Header path={path} current={current}/>
        <div className={styles.Image} ><img style={{'object-fit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/></div>
        <div className={styles.Name}>{item !== undefined && item.name}</div>
        <div className={styles.Price}>{ item === undefined ? '####' : new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo/100)}</div>
        <div className={styles.Characteristics}>
            {item !== undefined && item.item_characteristics.length > 0 && item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        {/* <div style={{'flex-grow': '1'}}/> */}
        <div className={styles.BuyButton} onClick={fetchData}><span className={styles.ButtonLabel}>В корзину</span></div>
    </div>
    );
}

export default ProductSearch
