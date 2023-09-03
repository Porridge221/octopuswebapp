import Header from './Header/Header';
import styles from './Cart.module.css'
import CartItem from './CartItem/CartItem';

function Cart() {

    return (
        <div className={styles.root}>
            <Header />
            <div className={styles.ItemList}>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className={styles.OrderBox} >
                <div className={styles.OrderInfo}>
                    <div className={styles.OrderLabel}>Пункт выдачи:</div>
                    <br />
                    <div className={styles.Store}>г. Владивосток, ул. Русская, 25 Ежедневно с 10:00 до 21:00</div>
                    <br />
                    <div className={styles.Count}>Товары, 5 шт.</div>
                </div>
                <div className={styles.SumBox}>
                    <span>Итого</span><span>3000 Р</span>
                </div>
                <div className={styles.ConfirmButton}>Подтвердить</div>
            </div>
        </div>
    );
}

export default Cart
