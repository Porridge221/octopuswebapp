import { useEffect, useState } from 'react';
import styles from './CartItem.module.css'
import useTelegram from '../../../hooks/useTelegram';

function CartItem({order, cart_id, fetchDeleteOne, updateScreen, setUpdateScreen}) {
    const [count, setCount] = useState(1);

    const {initData} = useTelegram();

    function fetchData(condition) {
        fetch("https://octopus-vape.ru/carts/add", { method:'POST',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'user_id': 1, 'variant_id': order.variant_id, 'count': condition ? count+1 : count-1} )
        })
        .then(response => {
            return JSON.stringify( {'user_id': 1, 'variant_id': order.variant_id, 'count': condition ? count+1 : count-1} )
        })
        .then(data => {
            console.log(JSON.stringify( {'user_id': 1, 'variant_id': order.variant_id, 'count': condition ? count+1 : count-1} ));
            setUpdateScreen(updateScreen+1);
        })
    }

    const incrementCount = () => {
        setCount(count+1);
        fetchData(true);
        // handlerUpdateScreen = 1;
        // console.log(count);
    };

    const decrementCount = () => {
        setCount(count-1);
        if (count-1 <= 0) {
            fetchDeleteOne(order);
        } else {
            fetchData(false);
        }
        // handlerUpdateScreen();
        // console.log(count);
    };

    useEffect(() => {
        setCount(order.count);
    }, [order])

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/>
            </div>
            <div className={styles.Info} >
            <div className={styles.Name} >{order.name}</div>
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(order.price_vvo/100)}</div>
                <div className={styles.RemoveButton} onClick={() => fetchDeleteOne(order)} >Удалить</div>
            </div>
            <div className={styles.CountInput} >
                <div className={styles.icon}><img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/plusButton.svg'} alt='' onClick={incrementCount}/></div>
                <div >{count}</div>
                <div className={styles.icon}><img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/minusButton.svg'} alt='' onClick={decrementCount}/></div>
            </div>
        </div>
    );
}

export default CartItem
