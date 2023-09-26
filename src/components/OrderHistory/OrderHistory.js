import styles from './OrderHistory.module.css'
import OrderItem from './OrderItem/OrderItem';
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';
import { useEffect, useState } from "react";
import FilterModal from '../Category/FilterModal/FilterModal';
import {AiOutlineClose} from "react-icons/ai";

import modalStyles from './OrderHistoryModal.module.css'
import CheckItem from './CheckItem/CheckItem';
import getStore from '../../services/getStore';
import CartService from '../../services/cartService';

function OrderHistory() {
    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [modalOrder, setModalOrder] = useState(new Map());
    const [modalItemsCount, setModalItemsCount] = useState(-1);

    const [result, setItems] = useState([]);

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const fetchRepeatOrder = () => {
        fetch("https://octopus-vape.ru/orders/repeat", { method:'POST',headers: {
        'Content-Type': 'application/json',
        'Telegram-Data': initData,
        }, body: JSON.stringify( {'order_id': modalOrder.order_id} )
        })
        .then(response => {
            return response
        })
        .then(data => {
            //CartService({isUpdate:false, isInit: true})
            navigate('/cart')
        })
    }

    const fetchData = () => {
        fetch("https://octopus-vape.ru/orders/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
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
                {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Заказ №{modalOrder.order_id}</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.ItemList}>
                    {/* <CheckItem />
                    <CheckItem />
                    <CheckItem />
                    <CheckItem /> */}
                    {modalOrder.size !== 0 && modalOrder.items.map(item => (
                        <CheckItem key={item.variant_id} item={item} showButton={true} />
                    ))}
                </div>
                <div className={modalStyles.VerticalBox}>
                    <span style={{fontWeight: '600'}}>Пункт выдачи:</span>
                    <span style={{color:'var(--tg-theme-hint-color)'}}>{getStore(modalOrder.store_id)}</span>
                    {/* <span>Товары: {modalItemsCount > 0 &&  (modalItemsCount + ' шт.')}</span> */}
                    <div className={modalStyles.HorizontalBox} style={{marginBottom: '0'}}>
                        <span style={{fontSize: '18px'}}>Итог:</span>
                        <span style={{fontSize: '18px'}}>{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(modalOrder.price/100)}</span>
                    </div>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} onClick={() => fetchRepeatOrder()}>Повторить заказ</div>
            </FilterModal>
        </div>
    );
}

export default OrderHistory
