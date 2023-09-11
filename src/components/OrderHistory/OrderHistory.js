import styles from './OrderHistory.module.css'
import OrderItem from './OrderItem/OrderItem';
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';
import { useEffect, useState } from "react";
import FilterModal from '../Category/FilterModal/FilterModal';
import {AiOutlineClose} from "react-icons/ai";

import modalStyles from './OrderHistoryModal.module.css'
import CheckItem from './CheckItem/CheckItem';

function OrderHistory() {
    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [modalOrder, setModalOrder] = useState(new Map());
    const [modalItemsCount, setModalItemsCount] = useState(-1);

    const [result, setItems] = useState([]);

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const fetchData = () => {
        fetch("https://45.153.69.113/orders/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': initData}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setItems(data);
          })
    }

    useEffect(() => {

        fetchData();
    
        // axios({url: "http://localhost:8000/variants", method: "GET", headers: {'Telegram-Data': initData}}).then((resp) => {
        //   const allItems = resp.data;
        //   setItems(allItems);
        // });
    
        // eslint-disable-next-line
    }, [])

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

    return (
        <div className={styles.root}>
            <div className={styles.Header}>
                <span className={styles.Label}>История заказов</span>
                <Link className={styles.CatalogLink} to='/home/categories/'>
                    <div className={styles.CatalogButton}>Выбрать и заказать</div>
                </Link>
            </div>
            {/* <div className={styles.EmptyBox} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>История заказов пуста {':('}</span>
            </div> */}
            {result.length > 0 ? (<div className={styles.OrderList} >
                {result.map(order => (
                    <OrderItem key={order.order_id} order={order} handleSetModal={handleSetModal}/>
                ))}
            </div>) : (<div className={styles.EmptyBox} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>История заказов пуста {':('}</span>
            </div>)}
            <FilterModal active={modalActive} setActive={setModalActive} >
            <div style={{'width': '60vw', 'overflow-x': 'hidden','overflow-y': 'auto'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Чек</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.ItemList}>
                    {/* <CheckItem />
                    <CheckItem />
                    <CheckItem />
                    <CheckItem /> */}
                    {modalOrder.size !== 0 && modalOrder.items.map(item => (
                        <CheckItem key={item.variant_id} item={item} />
                    ))}
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span>Пункт выдачи:</span>
                    <span>г. Владивосток, ул. Русская, 25. Ежедневно с 10:00 до 21:00</span>
                    <span>Товары: {modalItemsCount > 0 &&  (modalItemsCount)}</span>
                    <div className={modalStyles.HorizontalBox}>
                        <span>Итог</span>
                        <span>{modalOrder.price}</span>
                    </div>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton}>Повторить заказ</div>
            </FilterModal>
        </div>
    );
}

export default OrderHistory
