import { useEffect, useState } from 'react';
import styles from './CartItem.module.css'

function CartItem({order, cart_id}) {
    const [count, setCount] = useState(1);

    const incrementCount = () => {
        setCount(count+1);
        // console.log(count);
    };

    const decrementCount = () => {
        setCount(count-1);
        // console.log(count);
    };

    const fetchData = () => {
        fetch("https://45.153.69.113/carts/delete_one", { method:'DELETE',headers: {
        'Content-Type': 'application/json'
        }, body: JSON.stringify( {'cart_id': cart_id, 'variant_id': order.variant_id} )
        })
        .then(response => {
            return JSON.stringify( {'cart_id': cart_id, 'variant_id': order.variant_id} )
        })
        .then(data => {
            console.log(JSON.stringify( {'cart_id': cart_id, 'variant_id': order.variant_id} ));
        })
    }

    useEffect(() => {
        setCount(order.count);
    }, [order])

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'objectFit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/>
            </div>
            <div className={styles.Info} >
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(order.price_vvo/100)}</div>
                <div className={styles.Name} >{order.name}</div>
                <div className={styles.RemoveButton} onClick={fetchData} >Удалить</div>
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
