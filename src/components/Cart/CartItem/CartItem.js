import { useEffect, useState } from 'react';
import styles from './CartItem.module.css'
import useTelegram from '../../../hooks/useTelegram';
import useUser from '../../../hooks/useUser';
import CartService from '../../../services/cartService';

function CartItem({order, cart_id, fetchDeleteOne, updateScreen, setUpdateScreen}) {
    const [count, setCount] = useState(1);

    const user_curr = useUser(false)

    const {tg, initData} = useTelegram();

    const [imageVar, setImageVar] = useState(order?.image)

    function fetchData(condition) {
        fetch("https://octopus-vape.ru/carts/add", { method:'POST',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'user_id': 1, 'variant_id': order.variant_id, 'count': condition ? count+1 : count-1} )
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUpdateScreen(updateScreen+1);
        })
    }

    const incrementCount = () => {
        var countItems = 0;
        var user_data = CartService({isUpdate: false, isInit: false});
        user_data !== undefined && user_data?.items?.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            user_data.items.forEach(order => {
                countItems += order.count;
        });
        if (countItems >= 10) {
            tg.showAlert('Заказ не может содержать более 10 товаров.');
            return
        }
        
        setCount(count+1);
        fetchData(true);
        // handlerUpdateScreen = 1;
    };

    const decrementCount = () => {
        setCount(count-1);
        if (count-1 <= 0) {
            fetchDeleteOne(order);
        } else {
            fetchData(false);
        }
        // handlerUpdateScreen();
    };

    useEffect(() => {
        setCount(order.count);
    }, [order])

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                {/* <img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/> */}
                <img style={{'objectFit': 'contain', maxWidth: '103px', maxHeight: '103px'}} src={imageVar} alt='' onError={(ev) => setImageVar(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")} />
            </div>
            <div className={styles.Info} >
            <div className={styles.Name} >{order.name}</div>
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format([3, 4, 5].indexOf(user_curr?.user?.city_id) !== -1 ? order.price_shk/100 : order.price_vvo/100)}</div>
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
