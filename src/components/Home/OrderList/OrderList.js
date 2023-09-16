import FilterModal from "../../Category/FilterModal/FilterModal";
import OrderItem from "./OrderItem/OrderItem"
import styles from "./OrderList.module.css"
import {Link} from 'react-router-dom'

import { useEffect, useState } from "react";
import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css'
import CheckItem from "../../OrderHistory/CheckItem/CheckItem";

function OrderList({user_data}) {

    const [modalActive, setModalActive] = useState(false);
    const [modalOrder, setModalOrder] = useState(new Map());
    const [modalItemsCount, setModalItemsCount] = useState(-1);

    // const [orders, setItems] = useState([]);  // TODO: Bad solution

    // const orders = [
    //     {id: 1, price: '655'},
    //     {id: 2, price: '10850'},
    // ]

    const handleSetModal = (active, data) => {
        setModalActive(active);
        setModalOrder(data);
        var count = 0;
        data.items.forEach(el => {
            count += el.count;
        });
        setModalItemsCount(count);
        console.log(data);
    };

    // const fetchData = () => {
    //     fetch("http://localhost:8000/orders/1", {method: 'GET', headers: {'Content-Type': 'application/json'}})
    //       .then(response => {
    //         return response.json()
    //       })
    //       .then(data => {
    //         setItems(data);
    //       })
    // }

    useEffect(() => {
        // setItems(user_data !== undefined && user_data.orders);
        // console.log(user_data);
        // fetchData();
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.Header} >
                <span >Мои заказы</span>
                <Link className={styles.orderHistoryRef} to='/history'>
                    <span className={styles.orderHistoryButton}>История заказов</span>
                </Link>
            </div>
            {/* <div className={styles.orderList}> */}
                {user_data !== undefined && user_data.orders.length > 0 && (<div className={styles.orderList} >
                    {user_data.orders.map(order => (
                        <OrderItem key={order.order_id} order={order} handleSetModal={handleSetModal}/>
                    ))}
                </div>) }
                {/* <OrderItem order={orders[0]} handleSetModal={handleSetModal}/>
                <OrderItem order={orders[1]} handleSetModal={handleSetModal}/> */}
            {/* </div> */}
            <FilterModal active={modalActive} setActive={setModalActive} >
                {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Чек</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.ItemList}>
                    {modalOrder.size !== 0 && modalOrder.items.map(item => (
                        <CheckItem key={item.variant_id} item={item} showButton={false} />
                    ))}
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span style={{fontWeight: '600'}}>Пункт выдачи:</span>
                    <span style={{color:'var(--tg-theme-hint-color)'}}>г. Владивосток, ул. Русская, 25. Ежедневно с 10:00 до 21:00</span>
                    <span>Товары: {modalItemsCount > 0 &&  (modalItemsCount + ' шт.')}</span>
                    <div className={modalStyles.HorizontalBox}>
                        <span>Итог</span>
                        <span>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(modalOrder.price/100)}</span>
                    </div>
                </div>
            </div>
            </FilterModal>
        </div>
    )


}

export default OrderList