import styles from './CheckItem.module.css'
import { useState } from 'react';
import useTelegram from '../../../hooks/useTelegram';


function CheckItem({item, showButton}) {
    const {initData} = useTelegram();

    const [imageVar, setImageVar] = useState(item?.image)

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
            // setCartData(CartService({isUpdate:false, isInit: true}))
        })
    }

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                {/* <img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/> */}
                <img style={{'objectFit': 'contain'}} src={imageVar} alt='' onError={(ev) => setImageVar(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")} />
            </div>
            <div className={styles.Info} >
                <div className={styles.Name} >{item.name + ', '+ item.count + 'шт.'}</div>
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price/100)}</div>
                {showButton && (<div className={styles.AddButton} onClick={fetchData} >Добавить в корзину</div>)}
            </div>
        </div>
    );
}

export default CheckItem
