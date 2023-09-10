import Header from './Header/Header';
import styles from './Cart.module.css'
import CartItem from './CartItem/CartItem';
import FilterModal from '../Category/FilterModal/FilterModal';
import { useEffect, useState } from 'react';

import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css'

// import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import useUser from '../../hooks/useUser';

import { useNavigate } from "react-router-dom";

function Cart() {
    const user_data = useUser(true);
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);

    const [userName, setUserName] = useState();

    const [phoneNumber, setPhoneNumber] = useState();

    const [selectedStore, setSelectedStore] = useState('ул. Адмирала Фокина, 23в');

    const fetchData = () => {
        fetch("http://localhost:8000/orders/", { method:'POST',headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify( {'user_id': 1, 'name': userName, 'phone': '7' + phoneNumber, 'store_id': 1} )
          })
          .then(response => {
            return JSON.stringify( {'user_id': 1, 'name': userName, 'phone': '7' + phoneNumber, 'store_id': 1} )
          })
          .then(data => {
            console.log(JSON.stringify( {'user_id': 1, 'name': userName, 'phone': '7' + phoneNumber, 'store_id': 1} ));
          })
          setModalActive(false);
          navigate("/home");
    }

    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);
    useEffect(() => {
        console.log("cart effect");
        console.log(user_data);
        var count = 0;
        var price = 0;
        user_data !== undefined && user_data.cart.items.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            user_data.cart.items.forEach(order => {
                count += order.count; price += order.price_vvo/100 * order.count;
            });
        
            setCartItemCount(count);
            setCartPrice(price);
    }, [user_data])

    return (
        <div className={styles.root}>
            <Header />
            {user_data !== undefined && user_data.cart.items.length > 0 && (<div className={styles.ItemList} >
                    {user_data.cart.items.map(order => (
                        <CartItem key={order.variant_id} order={order} cart_id={user_data.cart.cart_id} />
                    ))}
            </div>) }
            {/* <div className={styles.ItemList}>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div> */}
            <div className={styles.OrderBox} >
                <div className={styles.OrderInfo}>
                    <div className={styles.OrderLabel}>Пункт выдачи:</div>
                    <br />
                    <div className={styles.Store}>г. Владивосток, ул. Русская, 25 Ежедневно с 10:00 до 21:00</div>
                    <br />
                    <div className={styles.Count}>Товары, {cartItemCount} шт.</div>
                </div>
                <div className={styles.SumBox}>
                    <span>Итого</span><span>{cartPrice} Р</span>
                </div>
                <div className={styles.ConfirmButton} onClick={() => setModalActive(true)}>Подтвердить</div>
            </div>
            <FilterModal active={modalActive} setActive={setModalActive} >
            <div style={{'width': '60vw', 'overflowX': 'hidden','overflowY': 'auto'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Подтвердите заказ</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span>Пункт выдачи</span>
                    <select className={modalStyles.Select} value={selectedStore} onChange={e => setSelectedStore(e.target.value)} >
                        <option value="В любом">В любом</option>
                        <option value="ул. Светланская, 9в">ул. Светланская, 9в</option>
                        <option value="ул. Русская, 46">ул. Русская, 46</option>
                        <option value="ул. Адмирала Фокина, 23в">ул. Адмирала Фокина, 23в</option>
                    </select>
                    <span>Имя получателя</span>
                    <input name="myInput" className={modalStyles.Input} value={userName} onChange={e => setUserName(e.target.value)}/>
                    <span>Телефон получателя</span>
                    <div className={modalStyles.NumberBox}>
                        +7 | <Input className={modalStyles.NumberInput}
                            country="RU"
                            international
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                    </div>
                    <div>{'Информация о заказе будет доступна на главной странице, а также в истории заказов.\n Оплата происходит в офлайн-магазине'}</div>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} onClick={fetchData}>Подтвердить</div>
            </FilterModal>
        </div>
    );
}

export default Cart
