import styles from './Product.module.css'
import Header from '../Header/Header'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';

// const item = {
//     'id': 8,
//     'name': 'Berry Mint Lemonade Extra Quality',
//     'image': 'https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c',
//     'price_vvo': 500,
//     'price_shk': 500,
//     'item_characteristics': [
//         {
//             'name': 'Объем (ml)',
//             'value': '30'
//         },
//         {
//             'name': 'Тип никотина',
//             'value': 'щёлочь'
//         },
//         {
//             'name': 'Крепость',
//             'value': '20'
//         },
//         {
//             'name': 'Производитель',
//             'value': 'Китай'
//         }
//     ]
//   }

function Product() {
    const {item, category_id} = useLocation().state;

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
            return JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} )
        })
        .then(data => {
            console.log(JSON.stringify( {'user_id': 1, 'variant_id': item.variant_id, 'count': 1} ));
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

    const path = ['Главная', 'Каталог', categories[category_id]]
    const current = item.name;

    return (
    <div className={styles.root}>
        <Header path={path} current={current}/>
        <div className={styles.Image} ><img style={{'object-fit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/></div>
        <div className={styles.Name}>{item.name}</div>
        <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo/100)}</div>
        <div className={styles.Characteristics}>
            {item.item_characteristics.length > 0 && item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        {/* <div style={{'flex-grow': '1'}}/> */}
        <div className={styles.BuyButton} onClick={fetchData}><span className={styles.ButtonLabel}>В корзину</span></div>
    </div>
    );
}

export default Product
