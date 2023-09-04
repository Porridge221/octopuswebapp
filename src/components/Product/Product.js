import styles from './Product.module.css'
import Header from '../Header/Header'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo';

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
    const item = useLocation().state;

    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home/categories/1'));
    tg.BackButton.show();
  
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

    const path = ['Главная', 'Каталог', 'Жидкость']
    const current = item.name;

    return (
    <div className={styles.root}>
        <Header path={path} current={current}/>
        <div className={styles.Image} ><img style={{'object-fit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/></div>
        <div className={styles.Name}>{item.name}</div>
        <div className={styles.Price}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price_vvo)}</div>
        <div className={styles.Characteristics}>
            {item.item_characteristics.map(characteristic => ( 
                <div key={characteristic.name} className={styles.CharacteristicItem}>{characteristic.name + ': ' + characteristic.value}</div>
            ))}
        </div>
        <div className={styles.BuyButton} onClick={fetchData}><span className={styles.ButtonLabel}>В корзину</span></div>
        <LoyaltyInfo/>
    </div>
    );
}

export default Product
