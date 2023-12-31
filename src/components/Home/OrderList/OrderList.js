import FilterModal from "../../Category/FilterModal/FilterModal";
import OrderItem from "./OrderItem/OrderItem"
import styles from "./OrderList.module.css"
import {Link} from 'react-router-dom'

import { useEffect, useState } from "react";
import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css'
import CheckItem from "../../OrderHistory/CheckItem/CheckItem";

import getStore from '../../../services/getStore'

function OrderList({user_data}) {

    const [modalActive, setModalActive] = useState(false);
    const [modalOrder, setModalOrder] = useState(new Map());
    const [modalItemsCount, setModalItemsCount] = useState(-1);

    const handleSetModal = (active, data) => {
        setModalActive(active);
        setModalOrder(data);
        var count = 0;
        data.items.forEach(el => {
            count += el.count;
        });
        setModalItemsCount(count);
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
                {user_data !== undefined && user_data?.orders?.length > 0 ? (<div className={styles.orderList} >
                    {user_data?.orders.map(order => (
                        <OrderItem key={order.name} order={order} handleSetModal={handleSetModal}/>
                    ))}
                </div>) : (<div className={styles.EmptyBox} >
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>Текущие заказы отсутствуют {':('}</span>
            </div>) }
            <FilterModal active={modalActive} setActive={setModalActive} >
                {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
            <div style={{'width': '80vw', 'height': '100%', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Заказ №{modalOrder.name}</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.ItemList}>
                    {modalOrder.size !== 0 && modalOrder.items.map(item => (
                        <CheckItem key={item.variant_id} item={item} showButton={false} />
                    ))}
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span style={{fontWeight: '600'}}>Пункт выдачи:</span>
                    <span style={{color:'var(--tg-theme-hint-color)'}}>{getStore(modalOrder.store_id)}</span>
                    {/* <span>Товары: {modalItemsCount > 0 &&  (modalItemsCount + ' шт.')}</span> */}
                    <div className={modalStyles.HorizontalBox}>
                        <span style={{fontSize: '18px'}}>Итог</span>
                        <span style={{fontSize: '18px'}}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(modalOrder.price/100)}</span>
                    </div>
                </div>
            </div>
            </FilterModal>
        </div>
    )


}

export default OrderList