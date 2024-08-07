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

import { useNavigate, useLocation } from "react-router-dom";
import useTelegram from '../../hooks/useTelegram';

import CartService from '../../services/cartService';

let isAdded = false;
let isFetching = false;

function Cart() {

    const [user_data, setUserData] = useState();
    const user_curr = useUser(false);
    const navigate = useNavigate();


    const fetchAddToCart = (variant_id_to_add) => {
        var countItems = 0;
        user_data !== undefined && user_data?.items?.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            user_data.items.forEach(order => {
                countItems += order.count;
        });
        if (countItems >= 10) {
            tg.showAlert('Заказ не может содержать более 10 товаров.');
            return
        }

        fetch("https://octopus-vape.ru/carts/add", { method:'POST',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'user_id': 1, 'variant_id': variant_id_to_add, 'count': 1} )
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            CartService({isUpdate: true, data: data, isInit: false})
            setUpdateScreen(updateScreen+1);
        })
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const type = queryParameters.get("variant_id")
        if (!isAdded && type) {
            fetchAddToCart(type);
            isAdded = true;
        }
    }, [])

    const {tg, initData} = useTelegram();
    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const [modalActive, setModalActive] = useState(false);

    const [userName, setUserName] = useState(user_curr?.user?.name);

    const [phoneNumber, setPhoneNumber] = useState('+' + user_curr?.user?.phone);

    const [selectedStore, setSelectedStore] = useState(user_curr?.user?.city_id === undefined || user_curr?.user?.city_id === null || user_curr?.user?.city_id === 1 ? 16 : user_curr?.user?.city_id === 2 ? 20 : user_curr?.user?.city_id === 3 ? 11 : user_curr?.user?.city_id === 4 ? 2 : 29);

    const fetchCart = () => {
        fetch("https://octopus-vape.ru/carts/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUserData(data);
            CartService({isUpdate: true, data: data});
        })
    }

    const [updateScreen, setUpdateScreen] = useState(1);

    const handlerUpdateScreen = () => {
        setUpdateScreen(updateScreen+1);
    }

    const fetchDeleteOne = (order) => {
        fetch("https://octopus-vape.ru/carts/delete_one", { method:'DELETE',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'cart_id': 1, 'variant_id': order.variant_id} )
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUpdateScreen(updateScreen+1);
        })
    }

    function fetchDeleteAllCart() {
        fetch("https://octopus-vape.ru/carts/delete_all?cart_id=1", { method:'DELETE',headers: {
          'Content-Type': 'application/json',
          'Telegram-Data': initData,
        }, body: JSON.stringify( {'cart_id': 1 } )
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUpdateScreen(updateScreen+1);
          })
    }

    const fetchData = () => {
        if (isFetching)
            return
        var countItems = 0;
        user_data !== undefined && user_data?.items?.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            user_data.items.forEach(order => {
                countItems += order.count;
        });
        if (countItems >= 10) {
            tg.showAlert('Заказ не может содержать более 10 товаров.');
            return
        }
        isFetching = true;
        var error = false;
        if (userName === "" || userName === undefined) {
            tg.showAlert('Введите своё Имя');
            error = true;
        } else if (phoneNumber.length !== 12) {
            tg.showAlert('Номер телефона должен состоять из 10 цифр!');
            error = true;
        } else if (selectedStore === "" || selectedStore === undefined) {
            tg.showAlert('Выберите город!');
            error = true;
        }
        if (!error) {
            fetch("https://octopus-vape.ru/orders/", { method:'POST',headers: {
          'Content-Type': 'application/json',
          'Telegram-Data': initData,
        }, body: JSON.stringify( {'user_id': 1, 'name': userName, 'phone': phoneNumber.slice(1), 'store_id': Number(selectedStore)} )
          })
          .then(response => {
            return response
          })
          .then(data => {
            isFetching = false;
            if (data?.status === 204) {
                tg.showAlert('Товара нет в наличии!');
            } else {
                setModalActive(false);
                CartService({isInit: true})
                navigate("/home");
            }
          })
        }
    }

    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);
    useEffect(() => {
        console.log('count update');
        var count = 0;
        var price = 0;
        user_data !== undefined && user_data?.items?.length > 0 &&
            // user_data.cart.items.map(order => {count += order.count; price += order.price_vvo/100 * order.count;} )
            user_data.items.forEach(order => {
                count += order.count; price += ([3, 4, 5].indexOf(user_curr?.user?.city_id) !== -1 ? order.price_shk/100 : order.price_vvo/100) * order.count;
        });
        setCartItemCount(count);
        setCartPrice(price);
    }, [user_data, setUserData]);

    useEffect(() => {
        console.log("cart effect");
        console.log(user_data);
        fetchCart();
    }, [updateScreen])

    return (
        <div className={styles.root}>
            <Header fetchDeleteAllCart={fetchDeleteAllCart} user_data={user_data} />
            {user_data !== undefined && user_data?.items?.length > 0 ? (<div className={styles.ItemList} >
                    {user_data.items.map(order => (
                        <CartItem key={order.variant_id} order={order} cart_id={user_data.cart_id} fetchDeleteOne={fetchDeleteOne} updateScreen={updateScreen} setUpdateScreen={setUpdateScreen} />
                    ))}
            </div>) : (<div className={styles.EmptyBox} >
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>Товары в корзине отсутствуют</span>
            </div>) }
            {user_data !== undefined && user_data?.items?.length > 0 && (<div className={styles.OrderBox} >
                <div className={styles.OrderInfo}>
                    <div className={styles.OrderLabel}>Итог:</div>
                    <br />
                    <div className={styles.Count}>Товары, {cartItemCount} шт.</div>
                </div>
                <div className={styles.SumBox}>
                    <span>Общая стоимость</span><span>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(cartPrice)}</span>
                </div>
                <div className={styles.ConfirmButton} onClick={() => setModalActive(true)}>Подтвердить</div>
            </div>)}
            
            <FilterModal active={modalActive} setActive={setModalActive} >
                {/* backgroundColor: 'var(--tg-theme-secondary-bg-color) */}
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Подтвердите заказ</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span>Пункт выдачи</span>
                    <select className={modalStyles.Select} value={selectedStore} onChange={e => setSelectedStore(e.target.value)} >
                        {user_curr?.user?.city_id === 1 ? <>
                            <option label="ул. Русская, 46" value={16}>ул. Русская, 46</option>
                            <option label="ул. Адмирала Фокина, 23в" value={15}>ул. Адмирала Фокина, 23в</option>
                            <option label="ул. Набережная, 7Б" value={1}>ул. Набережная, 7Б</option>
                            </> : user_curr?.user?.city_id === 2 ? <>
                                <option label="ул. Кирова, 2" value={20}>ул. Кирова, 2</option>
                            </> : user_curr?.user?.city_id === 3 ? <>
                            <option label="ул. Сахалинская, 45А, 1" value={11}>ул. Сахалинская, 45А, 1</option>
                            <option label="ул. Пуркаева М.А., 102В" value={24}>ул. Пуркаева М.А., 102В</option>
                            <option label="ул. Ленина, 219" value={28}>ул. Ленина, 219</option>
                            </> : user_curr?.user?.city_id === 4 ? <>
                            <option label="ул. Советская, 31, 3" value={2}>ул. Советская, 31, 3</option>
                            </>: user_curr?.user?.city_id === 5 ? <>
                            <option label="ул. Советская, 112А" value={29}>ул. Советская, 112А</option>
                            </> : <>
                            <option label="ул. Русская, 46" value={16}>ул. Русская, 46</option>
                            <option label="ул. Адмирала Фокина, 23в" value={15}>ул. Адмирала Фокина, 23в</option>
                            <option label="ул. Набережная, 7Б" value={1}>ул. Набережная, 7Б</option>
                            <option label="ул. Кирова, 2" value={20}>ул. Кирова, 2</option>
                            <option label="ул. Советская, 31, 3" value={2}>ул. Советская, 31, 3</option>
                            <option label="ул. Сахалинская, 45А, 1" value={11}>ул. Сахалинская, 45А, 1</option>
                            <option label="ул. Пуркаева М.А., 102В" value={24}>ул. Пуркаева М.А., 102В</option>
                            <option label="ул. Ленина, 219" value={28}>ул. Ленина, 219</option>
                            <option label="ул. Советская, 112А" value={29}>ул. Советская, 112А</option>
                        </> }
                    </select>
                    <span style={{marginTop: '5px'}}>Имя получателя</span>
                    <input name="myInput" className={modalStyles.Input} value={userName} onChange={e => setUserName(e.target.value)}/>
                    <span style={{marginTop: '5px'}}>Телефон получателя</span>
                    <div className={modalStyles.NumberBox}>
                        +7 | <Input className={modalStyles.NumberInput}
                            country="RU"
                            international
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                    </div>
                    <div style={{margin: '10px 0'}}>{'Информация о заказе будет доступна на главной странице, а также в истории заказов.\n Оплата происходит в офлайн-магазине'}</div>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} onClick={fetchData}>Подтвердить</div>
            </FilterModal>
        </div>
    );
}

export default Cart
